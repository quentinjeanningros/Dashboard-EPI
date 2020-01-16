FROM node:13.0.1 as dependencies
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:13.0.1-alpine
COPY --from=dependencies /app/build ./build/
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "build"]