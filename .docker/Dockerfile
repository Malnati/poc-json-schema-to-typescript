# Utiliza uma imagem oficial Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala todas as dependências necessárias
RUN npm install

# Copia o restante do código para o diretório de trabalho
COPY . .

# Expõe a porta utilizada pela aplicação (ajuste conforme a necessidade)
EXPOSE 3000

# Comando para iniciar o projeto
CMD ["npm", "start"]