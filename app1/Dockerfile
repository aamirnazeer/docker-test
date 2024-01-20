FROM node:slim

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
CMD [ "node", "dist/server.js" ]