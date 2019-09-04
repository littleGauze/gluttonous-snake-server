FROM node:10.15.3-alpine

EXPOSE 8082

WORKDIR /app
COPY package.json yarn.lock ./
COPY . .

RUN yarn config set registry https://registry.npm.taobao.org
RUN yarn && yarn build

CMD [ "yarn", "start" ]