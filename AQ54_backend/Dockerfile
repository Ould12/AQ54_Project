# Base image
FROM node:18-alpine

# Créer le répertoire de l'app
WORKDIR /app

# Installer NestJS CLI globalement avec les bonnes permissions
RUN npm i -g @nestjs/cli

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Donner les permissions nécessaires
RUN chown -R node:node /app
USER node

# Exposer le port
EXPOSE 5000

# Commande pour le développement
CMD ["npm", "run", "start:dev"]
