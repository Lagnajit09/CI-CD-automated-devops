#!/bin/sh

# Run migrations
echo "Running migrations..."
npx prisma migrate deploy

# Building app
echo "Starting Build..."
npm run build

# Start the application
echo "Starting the application..."
npm start
