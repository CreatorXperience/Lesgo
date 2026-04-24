# =============================================
# Frontend Dockerfile
# =============================================
# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY dashboard/package*.json ./
RUN npm ci

# Copy source and config files from dashboard/
COPY dashboard/src ./src
COPY dashboard/index.html ./
COPY dashboard/tailwind.config.js ./
COPY dashboard/tailwind.config.ts ./
COPY dashboard/postcss.config.js ./
COPY dashboard/vite.config.js ./
COPY dashboard/vite.config.ts ./
COPY dashboard/tsconfig.json ./
COPY dashboard/tsconfig.node.json ./
COPY dashboard/tsconfig.node.tsbuildinfo ./

# Vite will pick up VITE_* env vars at build time
ARG VITE_API_BASE_URL
ARG VITE_API_KEY
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_KEY=$VITE_API_KEY

RUN npm run build

# Stage 2: Serve static files
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    gzip on; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /assets/ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]