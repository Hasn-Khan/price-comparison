# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the Next.js server
EXPOSE 3000

# Start the Next.js server in development mode
CMD ["npm", "run", "dev"]
