# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.15.1-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run-script build

FROM nginx:alpine 
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf