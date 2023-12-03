FROM nginx:alpine
COPY /build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /usr/share/nginx/html
COPY .env /usr/share/nginx/html
EXPOSE 8080
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]