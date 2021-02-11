FROM node:14

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 4000

EXPOSE 4002

WORKDIR /usr/share/nginx/html
COPY ./dist/apps/admin-management .
