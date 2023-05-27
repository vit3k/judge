FROM node:18-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Build the Next.js app
RUN npm run build

# Expose the desired port
EXPOSE 3000

# Set the environment variable to production
ENV NODE_ENV production

# Start the Next.js app
CMD ["npm", "start"]