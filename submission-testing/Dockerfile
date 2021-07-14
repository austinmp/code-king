# Start with a Node.js base image.
FROM node:carbon

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY runners/ runners/
# Compile Typescript.
COPY tsconfig.json ./
COPY src/ src/
RUN npm run tsc

# Declare that the service uses port 8080 internally.
EXPOSE 8080
# Define the command that starts the service.
ENTRYPOINT ["node", "js/index.js"]
