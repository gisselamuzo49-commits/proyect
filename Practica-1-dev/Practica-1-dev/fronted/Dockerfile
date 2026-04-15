FROM node:20 AS build

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json* ./
RUN npm install

# Copiar el código y construir
COPY . .
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Instalar serve
RUN npm install -g serve

# Copiar build desde la etapa anterior
COPY --from=build /app/dist ./dist

# Exponer el puerto
EXPOSE 3000

# Añadir el flag de serve para Single Page Applications
CMD ["serve", "-s", "dist", "-l", "3000"]
