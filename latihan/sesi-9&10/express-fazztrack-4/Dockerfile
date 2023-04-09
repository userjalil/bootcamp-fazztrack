FROM node:18-alpine
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install && \
    npm install nodemon --save-dev
COPY ./app/. .
EXPOSE 9000
CMD npm run dev