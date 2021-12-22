FROM node:17.1.0
WORKDIR /app
COPY . .
RUN ls -a
RUN yarn install
CMD yarn run start