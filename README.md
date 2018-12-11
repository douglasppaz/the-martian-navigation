# The Martian Navigation

## Endpoints

### /current/

The response is a JSON content with probe position:

e.g.:

```
$ curl -X GET http://localhost:3000/current/
{"x":0,"y":0}
```

## Development

### Requirements

- Node 8
- `npm` or `yarn` (recommended)

### Dependencies

Install all development dependencies running `npm install` or `yarn install --dev`.

### Commands

Run the commands in terminal following this pattern: `npm run [command]` or `yarn [command]`.

| Command | Description |
|---|---|
| start | Start HTTP server. |
| dev | Start HTTP server with nodemon auto reload. |
| lint | Lint code with eslint following Airbnb Style Guide. |
| test | Run all unit tests with mocha |

## Environment Variables

| Name | Default | Description |
|---|---|---|
| PORT | 3000 | HTTP server port |
