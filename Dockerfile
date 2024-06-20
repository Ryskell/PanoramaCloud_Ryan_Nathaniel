# Utiliser une image de base officielle Node.js
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances
RUN npm install -g pnpm && pnpm install

# Copier le reste des fichiers du projet dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Ajouter les variables d'environnement pour RabbitMQ
ENV RABBITMQ_HOST=rabbitmq
ENV RABBITMQ_PORT=5672

# Démarrer l'applicationx
CMD ["npnm", "start"]


