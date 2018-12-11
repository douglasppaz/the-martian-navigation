# The Martian Navigation

[![node v8.12.0](https://img.shields.io/badge/node-v8.12.0-red.svg)](https://nodejs.org/en/blog/release/v8.12.0/) [![license MIT](https://img.shields.io/apm/l/vim-mode.svg)](https://github.com/douglasppaz/the-martian-navigation/blob/master/LICENSE) [![Build Status](https://travis-ci.org/douglasppaz/the-martian-navigation.svg?branch=master)](https://travis-ci.org/douglasppaz/the-martian-navigation) [![Coverage Status](https://coveralls.io/repos/github/douglasppaz/the-martian-navigation/badge.svg?branch=master)](https://coveralls.io/github/douglasppaz/the-martian-navigation?branch=master)

The Martian Navigation is a simple app made with Node.js to control probes in mars.

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

### [PUT] /initial/

Move probe to position (0, 0).

The response don't have content.

e.g.:

```
$ curl -X PUT http://localhost:3000/initial/
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
| MATRIX_SIZE | 5x5 | Matrix size separate per `x` |

## Deploy

You can found Docker images in [Docker Cloud repository](https://cloud.docker.com/repository/docker/douglasppaz/the-martian-navigation) to deploy The Martian Navigation in your prefer cloud platform.

### Play With Docker

To tests you can try use Play With Docker, deploy the stack in just one click:

[![Try in PWD](https://cdn.rawgit.com/play-with-docker/stacks/cff22438/assets/images/button.png)](http://play-with-docker.com?stack=https://raw.githubusercontent.com/douglasppaz/the-martian-navigation/master/docker-compose.yml)
