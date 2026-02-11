# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Build-time env vars (override via --build-arg or docker-compose)
ARG PUBLIC_SITE_DOMAIN=https://hardwarelab.org
ARG PUBLIC_AMAZON_TAG_US=hardwarelab-20
ARG PUBLIC_AMAZON_TAG_DE=hardwarelab-03
ARG PUBLIC_AMAZON_TAG_FR=hardwarelab-21
ARG PUBLIC_GA_ID=
ARG PUBLIC_ANALYTICS_ENABLED=true

ENV PUBLIC_SITE_DOMAIN=$PUBLIC_SITE_DOMAIN \
    PUBLIC_AMAZON_TAG_US=$PUBLIC_AMAZON_TAG_US \
    PUBLIC_AMAZON_TAG_DE=$PUBLIC_AMAZON_TAG_DE \
    PUBLIC_AMAZON_TAG_FR=$PUBLIC_AMAZON_TAG_FR \
    PUBLIC_GA_ID=$PUBLIC_GA_ID \
    PUBLIC_ANALYTICS_ENABLED=$PUBLIC_ANALYTICS_ENABLED \
    NODE_OPTIONS="--max-old-space-size=1024"

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:1.27-alpine

# Custom nginx config (gzip, cache-control, security headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
