FROM node:18-alpine

WORKDIR /app

ADD ./package.json ./package-lock.json ./tsconfig.json ./

RUN npm ci

ADD ./src ./src
ADD ./types ./types

RUN npm run build-ts

CMD [ "npm", "start" ]