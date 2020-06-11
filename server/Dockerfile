# build environment
FROM node:12.13.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY server.ts ./
COPY knexfile.ts ./
COPY src/ ./src/
COPY package.json ./
COPY tsconfig.json ./
RUN npm i --silent
RUN npm run build

FROM node:12.13.0-alpine
WORKDIR /app
COPY --from=build /app/dist ./
COPY --from=build /app/package.json ./
COPY uploads ./uploads
RUN npm install --production --silent
RUN npm run knex:migrate
RUN npm run knex:seed
RUN npm install pm2 -g
EXPOSE 8081

CMD ["pm2-runtime","server.js"]