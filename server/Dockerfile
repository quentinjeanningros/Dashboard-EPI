FROM node:alpine
ENV HOST_PORT 80
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 80
CMD ["node", "server.js"]