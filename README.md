# Projet de Chat en Ligne avec RabbitMQ et Node.js

Ce projet implémente un système de messagerie en ligne en utilisant RabbitMQ comme broker de messages et Node.js pour le backend. Les utilisateurs peuvent s'inscrire, se connecter, envoyer et recevoir des messages en temps réel.

## Prérequis

- Node.js (version 12 ou supérieure)
- NPM (version 6 ou supérieure)
- Erlang (version compatible avec RabbitMQ)
- RabbitMQ

## Installation

### Étape 1 : Installer Node.js et NPM

Téléchargez et installez Node.js depuis [nodejs.org](https://nodejs.org/). NPM est inclus avec Node.js.

### Étape 2 : Installer Erlang

1. Téléchargez et installez Erlang depuis [erlang.org](https://www.erlang.org/downloads).

### Étape 3 : Installer RabbitMQ

1. Téléchargez et installez RabbitMQ depuis [rabbitmq.com](https://www.rabbitmq.com/install-windows.html).
2. Ajoutez RabbitMQ aux variables d'environnement de votre système (Windows).

### Étape 4 : lancer le service rabbit-mq

voyez selon votre installation de rabbitMQ
Personnellement, j'ai installer via windows, donc il y a juste à lancer l'exec service-start de rabbitmq


### Étape 5 : telecharger le projet et le mettre dans le répertoire que vous voulez

### Étape 6 : se mettre dans le repertoire 

cd /cheminProjet

### Étape 7 : Installer les dépendances

npm install express body-parser amqplib sqlite3 socket.io express-session express-socket.io-session

### Étape 8 : initialiser la db

npm run init-db

### Étape 9 : lancer le server

npm start 