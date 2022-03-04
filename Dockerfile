FROM node:16.14.0-alpine as builder
RUN apk update && apk upgrade

WORKDIR /app
COPY ./ /app
RUN yarn install && yarn start && ./node_modules/.bin/json-server-auth ./backend/user.json --port 3001

WORKDIR /app
COPY ./backend/api /app/backend/api
RUN yarn install && yarn dev