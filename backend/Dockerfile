# ---------- Stage 1: Builder ----------
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    # Copy only package files first (better layer caching)
    COPY package*.json ./
    
    # Install only production dependencies
    RUN npm ci --only=production
    
    # ---------- Stage 2: Production ----------
    FROM node:18-alpine
    WORKDIR /app
    
    # Copy node_modules from builder
    COPY --from=builder /app/node_modules ./node_modules
    
    # Copy the rest of the source code
    COPY . .
    
    # Set environment
    ENV NODE_ENV=production
    
    # Expose backend port
    EXPOSE 5000
    
    # Health check (optional, great for Kubernetes)
    HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
      CMD wget -qO- http://localhost:5000/api/health || exit 1
    
    # Start the server
    CMD ["node", "server.js"]
    