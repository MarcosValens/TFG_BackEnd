# specify the node base image with your desired version node:<version>
FROM node:latest
WORKDIR /app
COPY package*.json /app/
RUN npm install && npm install -g nodemon
COPY . /app/
CMD ["nodemon", "index.js"]