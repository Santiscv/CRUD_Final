FROM node:18-slim
WORKDIR /app
COPY ./src /app
RUN npm install
CMD [ "npm", "start" ]

