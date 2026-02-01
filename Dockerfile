# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm ci --prefer-offline --no-audit

# Copy source code (excluding files in .dockerignore)
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

# Build the application
RUN npm run build

# Production stage - minimal runtime image
FROM node:20-alpine

WORKDIR /app

# Install dumb-init for proper signal handling (critical for scale-to-zero)
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies with aggressive optimization
RUN npm ci --only=production --prefer-offline --no-audit \
    && npm cache clean --force \
    && rm -rf /root/.npm \
    && rm -rf /tmp/* \
    && find /usr/local/lib/node_modules/npm -type f -name "*.md" -delete 2>/dev/null || true

# Copy built application from builder (only dist folder)
COPY --from=builder /app/dist ./dist

# Copy media files (8.5MB - needed for static serving)
COPY media ./media

# Set NODE_ENV to production
ENV NODE_ENV=production

# Use non-root user for security
USER node

# Expose port (Koyeb uses PORT env variable, defaults to 8000)
EXPOSE 8000

# Use dumb-init to handle signals properly (prevents zombie processes on scale-to-zero)
ENTRYPOINT ["dumb-init", "--"]

# Start the application directly (NOT through npm)
CMD ["node", "dist/main.js"]
