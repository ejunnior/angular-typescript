FROM node:latest as node
LABEL author="Edvaldo Junior"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/angular-typescript /usr/share/nginx/html

