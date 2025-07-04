# Imagen base
FROM node:20

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Luego copiar el resto del proyecto
COPY . .

# Exponer el puerto
EXPOSE 8081

# Comando para iniciar el servidor
CMD ["npm", "start"]

