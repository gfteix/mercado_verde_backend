FROM node:18

WORKDIR /mercado-verde-backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start
