FROM nginx:alpine

COPY nginx.conf C:/nginx_tmp/nginx.conf

EXPOSE 4000

EXPOSE 4001

WORKDIR html
COPY ./dist/apps/attendance-client .
