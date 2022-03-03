FROM node:16.14.0-alpine as builder
RUN apk update && apk upgrade

WORKDIR /app
COPY ./ /app
RUN yarn install && yarn start