# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client and apply migrations
RUN npx prisma generate
RUN npx prisma migrate deploy

# Build the TypeScript application
RUN npm run build

# Expose the port the backend will use
EXPOSE 5000

# Start the application using the built files
CMD ["node", "dist/index.js"]
