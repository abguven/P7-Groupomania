# Projet 7 - Créer un réseau social pour l'entreprise Groupomania

## Installation
Outils nécessaires:
  > NodeJs, MySql Server

### Installation Frontend
(si vous êtes sous Windows, il faudrait peut être définir la stratégies d’exécution comme **_RemoteSigned_**)

-Parcourir dans le classeur /frontend

-Installer les modules **Node**

`npm install`

-Installer @angular/cli 

`npm install -g @angular/cli`

-Démarrer le serveur angular

`ng serve`

### Installation Backend
-Parcourir dans le classeur /backend

-Installer les modules **Node**

`npm install`

-Vérifier si votre serveur MySQL est démarré

-Saisir vos identifiants de connexion dans le fichier /backend/config/config.json

-Injecter les données fournies dans le fichier "data_dump.sql"

```
mysql> CREATE DATABASE database_test;
mysql> USE database_test;
mysql> SOURCE <le chemin exact vers le fichier "data_dump.sql">;
```

-Démarrer le serveur backend
`npm start`

-Naviguer sur http://localhost:4200