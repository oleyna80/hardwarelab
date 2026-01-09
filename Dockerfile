# Stage 1: Build
FROM node:lts-alpine AS build

WORKDIR /app

# Set build-time optimization
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# Copy build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Default nginx config is sufficient for static site
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
