# BUILDER
FROM node:18.12-alpine3.17

## 작업 디렉토리
WORKDIR /usr/app

COPY ./ ./

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
