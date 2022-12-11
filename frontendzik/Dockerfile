FROM node:19.2.0 as build

WORKDIR /app/frontendzik/

COPY package*.json ./
COPY . ./
RUN npm install
RUN npm run build




FROM nginx:1.22.1-alpine

# Copy the build, env file and nginx cofnig file
COPY --from=build /app/frontendzik/build /usr/share/nginx/html
COPY --from=build /app/frontendzik/nginx.conf.template /etc/nginx/conf.d/default.conf.template

# install nodejs & npm
RUN apk add --update nodejs
RUN apk add --update npm


WORKDIR /usr/share/nginx/html

# Set the run command
CMD ["/bin/sh", "-c","nginx -g \"daemon off;\""]
