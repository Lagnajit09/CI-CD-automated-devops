FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 5000

# Use a script to run migrations and start the app
COPY start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]