FROM node:20-alpine AS build

RUN apk add g++ make py3-pip
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npx nx build music-player --configuration=production

FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY nginx/mime.types /etc/nginx/mime.types
COPY --from=build /app/dist/music-player /usr/share/nginx/html

EXPOSE 80
