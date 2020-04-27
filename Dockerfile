# specify the node base image with your desired version node:<version>
FROM node:latest
WORKDIR /app
COPY package*.json /app/
RUN npm install && npm install -g pm2
COPY . /app/
CMD ["pm2", "start", "index.js"]