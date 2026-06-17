# base (Node) -> development / test / build ; production usa nginx.

FROM node:current-alpine3.23 AS base
WORKDIR /app
COPY package*.json ./

# Desenvolvimento: servidor de dev do Vite (porta 5173, host: true)
FROM base AS development
RUN npm install
COPY . .
# EXPOSE 5173
CMD ["npm", "run", "dev"]

# Teste: executa o Vitest
FROM base AS test
RUN npm install
COPY . .
CMD ["npm", "test"]

# Build: gera os estáticos em /app/dist
FROM base AS build
COPY . .
RUN npm install
RUN npm run build

# Produção: serve os estáticos com nginx
FROM nginx:alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]