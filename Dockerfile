# base
FROM node:22-alpine AS base
USER node
WORKDIR /app

# backend
FROM base AS backend-dev
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/src ./src
EXPOSE 3000
CMD ["npm", "run", "dev"]

# frontend
FROM base AS frontend-dev
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/.oxlintrc.json frontend/index.html frontend/tsconfig.json frontend/tsconfig.app.json frontend/tsconfig.node.json frontend/vite.config.ts ./
COPY frontend/src ./src
COPY frontend/public ./public
EXPOSE 5173
CMD ["npm", "run", "dev"]
