FROM node:12-alpine

COPY ./app /app/
WORKDIR /app

COPY wait.sh /wait.sh

RUN apk add --no-cache mysql-client

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn

EXPOSE 3000
