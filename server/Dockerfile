# server/Dockerfile
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Create uploads directory with proper permissions
RUN mkdir -p public/uploads/products public/uploads/banners public/uploads/avatars && \
    chown -R node:node /usr/src/app/public/uploads && \
    chmod -R 755 /usr/src/app/public/uploads

# Copy the rest of the application
COPY . .

# Set correct permissions for copied files
RUN chown -R node:node /usr/src/app

# Switch to non-root user
USER node

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]
