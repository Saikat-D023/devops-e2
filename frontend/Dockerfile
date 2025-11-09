# ---------- Stage 1: Build Vite app ----------
    FROM node:18-alpine AS build
    WORKDIR /app
    
    # Copy and install dependencies
    COPY package*.json ./
    RUN npm ci
    
    # Copy source and build
    COPY . .
    RUN npm run build
    
    # ---------- Stage 2: Serve with Nginx ----------
    FROM nginx:stable-alpine
    
    # Copy the build output (Vite → dist)
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Expose default HTTP port
    EXPOSE 80
    
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]
    