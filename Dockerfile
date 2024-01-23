# Especificar la imagen base a utilizar
FROM node:20

# Seleccionar directorio de trabajo por defecto
WORKDIR /usr/src/app

# Copiando el contenido local al contenedor
COPY .env ./

COPY package*.json ./

# Instalando dependecias necesarias
RUN npm install

# Copiando el contenido local al contenedor
COPY . .

# Compilar la aplicacion
RUN npm run build

EXPOSE 3000

# Define comando de entrada al contenedor
CMD ["npm", "run", "start:prod"]
