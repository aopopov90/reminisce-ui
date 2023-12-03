FROM nginx:alpine
COPY /build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
COPY env.sh /usr/share/nginx/html/env.sh
RUN chmod 777 /usr/share/nginx/html/env.sh
RUN ls -lh /usr/share/nginx/html/env.sh
COPY .env /usr/share/nginx/html
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
# CMD ["nginx", "-g", "daemon off;"]