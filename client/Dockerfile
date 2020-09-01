# Builder base image
FROM alpine AS builder

# Install node.js and npm
RUN apk add --update nodejs
RUN apk add --update npm

# Setup working dir
WORKDIR '/app'

# Install app dependencies
COPY ./package.json ./
RUN npm install

# Copy app files
COPY ./ ./

# Build the app
RUN npm run build

# Production base image
FROM nginx

# Setup exposed port
EXPOSE 3000

# Nginx configuration
COPY ./client/default.conf /etc/nginx/conf.d/default.conf

# Coping build results
COPY --from=builder /app/build /usr/share/nginx/html