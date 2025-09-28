# Use Node image
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve
# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Build React app
RUN npm run build

# Serve using a lightweight server


EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
