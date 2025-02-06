FROM node:latest

# Create backend directory
WORKDIR /backend

# Mount the dbDir volume
VOLUME /backend/dbDir

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Start the server
CMD ["node", "./node_modules/y-websocket/bin/server.cjs"]