## Fetch Event Source

基于fetch 获取流式数据

### Install

```sh
npm install @latelyjs/fetch-event-source
```

### Usage

```ts
import { fetchEventSource } from '@latelyjs/fetch-event-source';

await fetchEventSource('/api/sse', {
    onmessage(msg) {
        console.log(msg.data);
    }
});
```

### Example

```ts
import { fetchEventSource, EventStreamContentType} from '@latelyjs/fetch-event-source';

const controller = new AbortController();

const finish = () => {
    console.log('finish') 
};

const getHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-requested-with": "XMLHttpRequest",
  };
  const authHeader = "Authorization";

  const token = ""; //token

  headers[authHeader] = `${token}`;
}

const requestPayload = {};

fetchEventSource('/api/sse', 
    {
        method: "POST",
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
        headers: getHeaders(),
    },
   {
    async onopen(response) {
       if (
            !response.ok ||
            !response.headers
                .get("content-type")
                ?.startsWith(EventStreamContentType) ||
              response.status !== 200
        ) {
              finish();
        }
    },
    onmessage(msg) {
        // msg
        console.log(msg.data);
    },
    onclose() {
        //Abort
    },
    onerror(error) {
        //error
    },
    onfinily(){
        //end
        finish();
    }
});
```
