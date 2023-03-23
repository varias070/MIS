FROM node:19

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate

CMD [ "node", "app.js" ]