# Use a newer version of Node.js
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use nginx image to serve the Angular app
FROM nginx:alpine
COPY ./nginx.conf etc/mginx/conf.d/default
COPY --from=build /app/dist/rentify_frontend/browser /usr/share/nginx/html

