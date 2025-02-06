# Build stage
FROM node:latest as build

WORKDIR /frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /frontend/dist /usr/share/nginx/html

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]