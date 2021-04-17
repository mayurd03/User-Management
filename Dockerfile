FROM node:dubnium
  
WORKDIR /usr/src/user-management

COPY package.json .

COPY . .

RUN npm install

CMD [ "npm", "start" ]
