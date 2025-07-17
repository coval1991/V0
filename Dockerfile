FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build # Este é o comando de build que o Docker executa
                 # (npm run build é definido no package.json do frontend)

EXPOSE 3000

CMD ["npm", "start"] # Este é o comando de start que o Docker executa
                    # (npm start é definido no package.json do frontend)
