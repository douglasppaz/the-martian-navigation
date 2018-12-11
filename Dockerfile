FROM node:8

ENV PORT 80

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENTRYPOINT [ "yarn", "start" ]
