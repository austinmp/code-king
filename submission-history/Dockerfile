# Start with a Node.js base image.
FROM node:16

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY / /

# Declare that the service uses port 3000 internally.
EXPOSE 5050

# Define the command that starts the service.
ENTRYPOINT ["node", "index.js"]
