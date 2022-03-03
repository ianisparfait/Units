# Ecommerce en React

![Node CI](https://github.com/ianisparfait/Units/workflows/Node%20CI/badge.svg)

## Besoins

* [Node.js](https://nodejs.org/en/)
* [React](https://fr.reactjs.org/)

## Étape d'utilisation
## Auth API

1. Run `yarn install`
2. Run `./node_modules/.bin/json-server-auth ./backend/user.json --port 3001` pour démarrer le serveur api local
3. Run `yarn start` pour démarrer le serveur de développement
4. Se rendre sur [http://localhost:3000/](http://localhost:3000/)  



Pour se connecter:  
      - Email: `regular@example.com` ou `admin@example.com`  
      - Mot de passe: `password`

## Backend
1. Placez vous dans le dossier 'backend/api'
2. Run `yarn install`
3. Run `yarn dev` pour avoir le Hot-reload, sinon, `yarn start`

## Frontend
1. Placez vous à la racine du projet
2. Run `yarn install`
3. Run `yarn start`

## Tout en 1 avec Docker
1. Placez vous à la racine du projet
2. Run docker-compose up