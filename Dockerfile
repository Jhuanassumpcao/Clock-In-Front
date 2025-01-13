# Use uma imagem base mínima para servir arquivos estáticos
FROM node:22.8 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use uma imagem de servidor leve para servir a build
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta padrão do Nginx
EXPOSE 80

# Comando para rodar o servidor
CMD ["nginx", "-g", "daemon off;"]
