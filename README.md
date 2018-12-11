# The Martian Navigation

## Endpoints

### [GET] /current/

The response is a JSON content with probe position and direction.

e.g.:

```
$ curl -X GET http://localhost:3000/current/
{"x":0,"y":0}
```

### [PATCH] /exec/

Send commands list to probe via this patch HTTP request.

Use the `x-www-form-urlencoded` pattern to send `commands` param.

The response is a JSON content with probe position and direction.

e.g.:

```
$ curl -X PATCH http://localhost:3000/exec/ \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    -d 'commands%5B%5D=M&commands%5B%5D=M'
{"x":2,"y":0,"direction":"D"}
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
