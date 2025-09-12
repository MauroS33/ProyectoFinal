# Etapa 1: Construcción
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar TODO el código fuente
COPY . .

# Compilar el proyecto usando NestJS CLI
RUN npm run build

# Eliminar dependencias de desarrollo para reducir el tamaño de la imagen
RUN npm prune --production && npm cache clean --force


# Etapa 2: Ejecución
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instalar solo las dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Exponer el puerto donde corre la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]