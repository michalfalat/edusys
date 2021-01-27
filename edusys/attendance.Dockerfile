FROM nginx:1.13.8-alpine

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 4000

EXPOSE 4001

WORKDIR /usr/share/nginx/html
COPY ./dist/apps/attendance-client .
