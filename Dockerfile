FROM node:18.16.1
WORKDIR /client
COPY ./package*.json ./
RUN npm install
RUN npm install -g http-server
COPY . .
RUN npm run build
EXPOSE 8081
EXPOSE 8080
CMD [ "http-server", "dist" ]
