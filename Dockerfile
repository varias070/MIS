From node:19
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma migrate dev
RUN npx prisma generate
CMD [ "node", "app.js" ]