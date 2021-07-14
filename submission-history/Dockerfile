# Start with a Node.js base image.
FROM node:carbon

# Install dependencies.
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Compile Typescript.
COPY tsconfig.json ./
COPY src/ src/
RUN npm run tsc

# Declare that the service uses port 3000 internally.
EXPOSE 5050
# Define the command that starts the service.
ENTRYPOINT ["node", "js/index.js"]
