FROM node:16-slim as builder
ARG NODE_ENV
ARG BUILD_FLAG
RUN apt-get -qy update
RUN apt-get -qy install g++ && apt-get -qy install make && apt-get -qy install python3-pip && apt-get -qy install openssl
WORKDIR /app/builder
COPY . .
RUN yarn
RUN npx prisma generate