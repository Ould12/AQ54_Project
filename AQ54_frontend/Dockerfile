# Étape 1 : Construire l'application React
FROM node:16-alpine AS build

# Utiliser root pour éviter les problèmes de permission
USER root

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste de l'application
COPY . .

# Donner les permissions et construire
RUN chmod +x node_modules/.bin/react-scripts && \
    npm run build

# Étape 2 : Servir les fichiers avec NGINX
FROM nginx:stable-alpine

# Copier les fichiers de build
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
