FROM node:14.18.1-alpine3.13 as builder
ARG NODE_ENV
ARG BUILD_FLAG
RUN apk add g++ make py3-pip
WORKDIR /app/builder
COPY . .
RUN yarn