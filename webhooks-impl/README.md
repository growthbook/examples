# webhooks examples

- [SDK Endpoint web hooks](#sdk-endpoint-web-hooks)
- [🚧 Event-based web hooks](#-event-based-web-hooks)
- [Usage](#usage)


## SDK Endpoint web hooks

See code in `./sdk-endpoints-webhooks`.

Set up the SDK endpoint to URL of the server running on your device on your local network, for example:

```
http://192.168.0.xx:1115/webhooks
```


## 🚧 Event-based web hooks

See code in `./events`.

<!-- 
Set up the SDK endpoint to URL of the server running on your device on your local network, for example:

```
http://192.168.0.xx:1115/events/webhooks
``` 
-->


## Usage

Copy the `.env` file and populate the values.

    cp .env.example .env

Install dependencies:

    npm install

Run the server:

    npm run dev
