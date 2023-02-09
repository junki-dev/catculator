# BUILDER
FROM node:18.12-alpine3.17 AS builder

## 작업 디렉토리
WORKDIR /usr/app

COPY package.json .

COPY . .

RUN if [ "$ENV" = "local" ]; then yarn build:local ; else yarn build ; fi

# RUNNER
## 경량화된 기본 이미지
FROM node:18.12-alpine3.17 AS runner

## 작업 디렉토리
WORKDIR /usr/app

RUN npm i -g pm2

COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/.env ./.env

COPY ./ecosystem.config.js .

## 애플리케이션 실행
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
