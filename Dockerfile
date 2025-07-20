# Use the latest Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the app
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]
