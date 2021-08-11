# Start with a Node.js base image.
FROM node:carbon

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY / /

# Declare that the service uses port 3000 internally.
EXPOSE 3000
# Define the command that startsn the service.
ENTRYPOINT ["node", "index.js"]