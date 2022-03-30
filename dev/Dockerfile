FROM node:16-alpine3.14

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn run build

EXPOSE 3001

ENTRYPOINT [ "npm", "run", "start" ]
