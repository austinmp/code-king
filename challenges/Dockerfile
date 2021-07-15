# Start with a Node.js base image.
FROM node:carbon

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY ./views ./views
COPY ./routes ./routes
COPY ./models ./models
COPY ./*.js ./
COPY ./controllers ./controllers
COPY ./public ./public
COPY ./redis-server ./redis-server
# Declare that the service uses port 3000 internally.
EXPOSE 3000
# Define the command that starts the service.
ENTRYPOINT ["node", "server.js"]