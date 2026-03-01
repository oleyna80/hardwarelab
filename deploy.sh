#!/usr/bin/env bash
# VPS deployment script for hardwarelab-site
# Usage: ./deploy.sh [image_tag]
# Always uses docker-compose.vps.yml to ensure npm_default network attachment.

set -euo pipefail

IMAGE_TAG="${1:-latest}"
IMAGE_REPO="${IMAGE_REPO:-ghcr.io/oleyna80/hardwarelab-site}"
COMPOSE_FILE="docker-compose.vps.yml"

echo "▶ Deploying hardwarelab-site (image: ${IMAGE_REPO}:${IMAGE_TAG})..."

export IMAGE_TAG
export IMAGE_REPO
docker compose -f "${COMPOSE_FILE}" pull
docker compose -f "${COMPOSE_FILE}" up -d --remove-orphans
docker image prune -f

echo "✅ Deploy complete. Containers:"
docker compose -f "${COMPOSE_FILE}" ps
