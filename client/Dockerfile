FROM node:16-alpine3.14

WORKDIR /home/node/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3002

ENTRYPOINT [ "npm", "run", "dev" ]
