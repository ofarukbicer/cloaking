# Use lightweight Node.js
FROM node:20-slim 

# Set working directory
WORKDIR /app 

# Copy and install dependencies
COPY package.json ./ 
RUN npm install --only=production 

# Copy source code
COPY . . 

# Expose port
EXPOSE 8080

# Start server
CMD ["node", "proxy.js"]