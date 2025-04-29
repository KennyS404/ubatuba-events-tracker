FROM node:18-alpine

WORKDIR /app

# copie package.json e o lock do npm
COPY package.json package-lock.json ./

# instale dependências via npm
RUN npm ci

# copie o restante do código
COPY . .

# rode o dev server
CMD ["npm", "run", "dev", "--", "--host"]
