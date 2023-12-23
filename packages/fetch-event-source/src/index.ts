import {
  FetchEventSourceInit,
  EventStreamContentType,
  EventSourceMessage,
  EventKey,
} from './types';

import { parseLine } from './parse';

export async function fetchEventSource(
  input: RequestInfo,
  options?: FetchEventSourceInit,
) {
  try {
    const response = await fetch(input, {
      ...options,
    });

    const contentType = response.headers.get('content-type');

    // 打开
    options?.onopen?.(response);

    if (
      !response.ok ||
      !response.headers.get('content-type')?.startsWith('text/event-stream') ||
      response.status !== 200
    ) {
      options?.onerror?.(response);
      return options?.onfinally?.();
    }
    if (response.ok && contentType === 'text/event-stream') {
      const reader = response?.body?.getReader();
      let buffer: any;
      new ReadableStream({
        start(controller) {
          function push() {
            reader
              ?.read()
              .then(({ done, value }) => {
                if (done) {
                  options?.onfinish?.();
                  return options?.onfinally?.();
                }
                const chunk = new TextDecoder('utf-8').decode(value);
                buffer += chunk;
                const lines = buffer?.split('\n');
                buffer = lines?.pop?.();

                lines.forEach((line: string) => {
                  if (line?.trim()?.length > 0) {
                    options?.oncustomline?.(line);
                    if (
                      line.indexOf(EventKey.Data) === -1 &&
                      line.indexOf(EventKey.Event) === -1 &&
                      line.indexOf(EventKey.Id) === -1
                    ) {
                      options?.onmessage?.({
                        data: line,
                      });
                    } else {
                      if (line.indexOf(EventKey.Data) > -1) {
                        const lineText = parseLine(line, EventKey.Data);
                        options?.onmessage?.({
                          data: lineText,
                        });
                      } else if (line.indexOf(EventKey.EventAdd) > -1) {
                        const lineText = parseLine(line, EventKey.EventAdd);
                        options?.onmessage?.({
                          data: lineText,
                        });
                      } else if (line.indexOf(EventKey.EventMessage) > -1) {
                        const lineText = parseLine(line, EventKey.EventMessage);
                        options?.onmessage?.({
                          data: lineText,
                        });
                      } else if (line.indexOf(EventKey.EventFinish) > -1) {
                        return options?.onfinally?.();
                      } else if (line.indexOf(EventKey.EventError) > -1) {
                        const [_, errText] = line.split(EventKey.EventError);
                        options?.onmessage?.({
                          data: errText,
                        });
                        options?.onfinally?.();
                        return options?.onerror?.(errText);
                      } else if (line.indexOf(EventKey.eventErrorHandle) > -1) {
                        const [_, errText] = line.split(
                          EventKey.eventErrorHandle,
                        );
                        options?.onmessage?.({
                          data: errText,
                        });
                        options?.onfinally?.();
                        return options?.onerror?.(errText);
                      }
                    }
                  }
                });
                push();
              })
              .catch((error) => {
                options?.onerror?.(`Error reading the stream: ${error}`);
                options?.onfinally?.();
                controller.error(error);
              });
          }
          push();
        },
      });
    } else {
      options?.onerror?.('Unexpected response or content type');
      options?.onfinally?.();
    }
  } catch (e: any) {
    if (e?.name === 'AbortError') {
      options?.onclose?.();
    }
    options?.onerror?.(e);
    options?.onfinally?.();
    throw e;
  }
}

export {
  type FetchEventSourceInit,
  EventStreamContentType,
  type EventSourceMessage,
};
