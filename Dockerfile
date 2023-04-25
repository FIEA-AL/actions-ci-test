FROM node:lts

WORKDIR /app
COPY package*.json .
RUN npm install --omit dev

COPY . .

CMD ["node", "/app/api/server.js"]