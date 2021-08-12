# Start with a Node.js base image.
FROM node:16
# WORKDIR /src
ENV CHOKIDAR_USEPOLLING=true

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# Declare that the service uses port 8010 internally.
EXPOSE 8010 
# Define the command that starts the service.
ENTRYPOINT ["node", "index.js"]