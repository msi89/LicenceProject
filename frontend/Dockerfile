FROM node:15.13-alpine as builder
WORKDIR /app/www
COPY . .
RUN npm install --silent
RUN npm install -g http-server
ARG API_URL
ENV REACT_APP_API_URL=$API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/www/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf:ro
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]