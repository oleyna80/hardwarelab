# Stage 1: Build SSR bundle
FROM node:22-alpine AS build

WORKDIR /app

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

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Runtime (Astro Node adapter)
FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=build /app/dist ./dist

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
