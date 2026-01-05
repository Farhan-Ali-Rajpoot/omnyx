FROM node:20

# Create a clean working directory inside the container
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Copy rest of the project (everything including config, pages, public, etc.)
COPY . .

# Expose the Next.js port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
