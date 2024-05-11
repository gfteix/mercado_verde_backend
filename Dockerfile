FROM node:18

WORKDIR /challenge-backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
