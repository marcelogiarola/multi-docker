# Base image
FROM alpine

# Install node.js and npm
RUN apk add --update nodejs
RUN apk add --update npm

# Setup working dir
WORKDIR '/app'

# Install app dependencies
COPY ./package.json ./
RUN npm install

# Copy app files to working dir
COPY ./ ./

# Setup default initialization command
CMD [ "npm", "run", "start" ]