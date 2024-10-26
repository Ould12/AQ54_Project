# AQ54 - Air Quality Monitoring

## Contents

- [Introduction](#Introduction)
- [Purpose of the Project](#Purpose-of-the-Project)
- [Project Architecture](#Project-Architecture)
- [Frontend of the Project](#Frontend-of-the-Project)
- [Backend of the Project](#Backend-of-the-Project)
- [Installation and Usage](#Installation-and-Usage)


## Introduction 

**AQ54** est un projet de surveillance de la qualité de l'air visant à collecter et analyser des données en temps réel à Abidjan. Ce projet utilise des capteurs Airgino pour mesurer divers polluants atmosphériques, tels que le CO, NO2, PM10, et PM2.5, et fournit des visualisations accessibles via une application web.

## Purpose of the Project

Le projet AQ54 vise à surveiller la qualité de l'air pour aider les décideurs, les organisations et les citoyens à mieux comprendre la pollution atmosphérique et son impact. Ce système fournit des informations en temps réel et des prévisions sur la qualité de l'air, permettant ainsi une meilleure gestion de la santé publique et de l’environnement.

## Project Architecture

Le projet est divisé en trois parties principales : le frontend, le backend, et la base de données.

1. **Frontend** : Réalisé avec React, il affiche les données de la qualité de l'air par jour et par heure. Le frontend offre des visualisations interactives des niveaux de pollution.
2. **Backend** : Construit avec NestJS, le backend récupère les données des capteurs et gère les agrégations horaires et journalières avant de les servir au frontend. Un **cron job** intégré dans le backend envoie des mises à jour toutes les heures en récupérant et en enregistrant les dernières données de qualité de l’air.
3. **Base de Données PostgreSQL** : Stocke les données de chaque polluant en fonction des relevés de chaque capteur.

## Frontend of the Project

Le frontend utilise **React** et **TailwindCSS** pour l’interface utilisateur. Il présente des **graphiques dynamiques** et des **indicateurs de performance (KPI)** des données de qualité de l'air pour chaque polluant. Le frontend communique avec le backend via des requêtes HTTP pour récupérer les données et les afficher dans des graphiques interactifs.

## Backend of the Project

Le backend est développé avec **NestJS**. Il :
- Récupère les données des capteurs et effectue les agrégations horaires et journalières.
- Utilise **TypeORM** pour interagir avec la base de données PostgreSQL.
- Expose des endpoints pour récupérer les données via une API REST.
- **Cron Job** : Un job planifié fonctionne toutes les heures pour récupérer automatiquement les nouvelles données de qualité de l'air depuis les capteurs et les enregistrer dans la base de données.

## Installation and Usage

### Pré-requis

Assurez-vous d'avoir **Docker** et **Docker Compose** installés pour une exécution rapide en environnement conteneurisé.

### Étapes d'Installation

1. **Clonez le projet :**
   ```bash
   git clone https://github.com/Ould12/AQ54_Project.git 
   cd AQ54_Project

2. **Créez un fichier .env à la racine du projet et ajoutez les configurations suivantes :**

    ```
    POSTGRES_USER=localhost
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=aq54_db
    POSTGRES_HOST=postgres
    POSTGRES_PORT=5432 
    ```
3. ***Lancez les conteneurs Docker :***

```
docker-compose up --build
```
Cela initialise les services suivants :

PostgreSQL : Base de données pour stocker les données des capteurs.
Backend NestJS : API pour la récupération, l'agrégation des données, et gestion du cron job.
Frontend React : Interface utilisateur pour la visualisation des données.
Utilisation
Après le démarrage :

Accédez au frontend via : http://localhost:3000
L’API backend est disponible sur : http://localhost:5000/api/


