# Projet 7 - Créer un réseau social pour l'entreprise Groupomania
## Description
Le projet consiste à construire un réseau social interne pour les employés de Groupomania.
Le but de cet outil est de faciliter les interactions entre collègues.
Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.
Voici les fonctionnalités présentes dans l'application:
* Une page de connexion permettant à l’utilisateur de se connecter, ou bien de créer un compte s’il n’en possède pas. 
    
    **_Détails de la fonctionnalité de connexion_**
    1. Un utilisateur doit avoir la possibilité de se déconnecter.
    2. La session de l’utilisateur persiste pendant qu’il est connecté.
    3. Les données de connexion doivent être sécurisées.
* Une page d’accueil qui liste les posts créés par les différents utilisateurs de façon antéchronologique.

* Création d’une publication
  * Un utilisateur connecté peux créer une publication
  * Une publication peux contenir du texte ou une image, ou bien les deux.
  * Un utilisateur peux modifier et supprimer ses publications.

* Gestion des likes
  * Un utilisateur peux liker un post, une seule fois pour chaque post.

* Rôle administrateur: Un utilisateur dont le role est défini comme "admin" dans la base de données peux modifier ou supprimer n'importe quel post.

## Installation
Outils nécessaires:
  > NodeJs, MySql Server

### Installation Frontend
(si vous êtes sous Windows, il faudrait peut être définir la stratégies d’exécution comme **_RemoteSigned_**)

* Commencer par installer **NodeJS** si vous ne l'avez pas.
* Parcourir dans le classeur /frontend
* Installer les modules **Node** :

    `npm install`
* Installer **@angular/cli** :

    `npm install -g @angular/cli`
* Démarrer le serveur angular

    `ng serve`

### Installation Backend

* Installer MySQL Server et créer un utilisateur
* Vérifier si votre serveur MySQL est démarré

* Configurer le serveur
    - Saisir vos identifiants de connexion dans le fichier /backend/config/config.json.Comme le projet est en mode _test_ ne saisir que la section _test_ du fichier config.json.
    - Noter bien le nom de la base de données dans la configuration.Vous devrez utiliser le même nom dans l'étape suivante.

* Lancer _MySQL CommandLine Client_
* Injecter les données fournies dans la base de données en suivant les étapes suivantes.

    ```
    mysql> CREATE DATABASE <Nom de la base de données>;
    mysql> USE <Nom de la base de données>; 
    mysql> SOURCE <le chemin exact vers le fichier SQL>;
    ```
* Parcourir dans le classeur /backend
* Installer les modules **Node**

    `npm install`

* Démarrer le serveur backend

    `npm start`

* **Felicitations!** Vous pouvez aller consulter le project maintenant sur http://localhost:4200



