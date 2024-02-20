# Dockerfile para el frontend

FROM node:20.11.1 AS frontend

WORKDIR /app/frontend

COPY ./ ./

RUN npm install
EXPOSE 5173


# Comando por defecto para iniciar el servidor de Vite
CMD ["npm", "run", "dev"]
