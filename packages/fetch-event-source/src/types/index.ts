export interface EventSourceMessage {
  data?: string;
}

export const EventStreamContentType = "text/event-stream";

export interface FetchEventSourceInit extends RequestInit {
  // 打开
  onopen?: (response: Response) => Promise<void>;
  // 监听消息
  onmessage?: (ev: EventSourceMessage) => void;
  // 监听取消
  onclose?: () => void;
  // 监听错误
  onerror?: (err: any) => number | null | undefined | void;
  // 无论成功失败都会进来
  onfinally?: () => void;
}

export enum EventKey {
  Data = "data:",
  Event = "event:",
  Id = "id:",
  EventAdd = "event:add",
  EventMessage = "event:message",
  EventFinish = "event:finish",
  EventError = "event:error",
  eventErrorHandle = "event:errorhandle",
}
