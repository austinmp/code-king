# Start with a Node.js base image.
FROM node:10.16.3-alpine

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy source code into docker container
COPY tsconfig.json ./
COPY / /
RUN npm run tsc

# Declare that the service uses port 3000 internally.
EXPOSE 5000
# Define the command that starts the service.
ENTRYPOINT ["node", "./session.js"]
