FROM base-image:nx-base AS builder

ARG NODE_ENV
ARG BUILD_FLAG
ARG PORT
WORKDIR /app/builder
COPY . .
RUN npx nx build core-service ${BUILD_FLAG}

FROM base-image:nx-base

WORKDIR /app
COPY --from=builder /app/builder ./
ENV NODE_ENV=$NODE_ENV

EXPOSE $PORT

CMD ["node", "./dist/apps/core-service/main.js"]