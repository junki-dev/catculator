# BUILDER
FROM node:14.20-alpine AS builder

## 작업 디렉토리
WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn --ignore-engines --frozon-lockfile

COPY . .

RUN if [ "$ENV" = "local" ]; then yarn build:local ; else yarn build ; fi

# RUN yarn build 

# RUNNER
## 경량화된 기본 이미지
FROM node:14.20-alpine AS runner


## 작업 디렉토리
WORKDIR /usr/app

RUN npm i -g pm2

COPY --from=builder /usr/app/package.json ./package.json
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/.env ./.env
COPY --from=builder /usr/app/node_modules ./node_modules

COPY ./ecosystem.config.js .

## 애플리케이션 실행
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
