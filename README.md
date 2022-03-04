# Ecommerce en React

![Node CI](https://github.com/ianisparfait/Units/workflows/Node%20CI/badge.svg)
![Backend CI](https://github.com/ianisparfait/Units/workflows/Backend%20CI/badge.svg)  
Ce badge détermine si les tests du projet sont correcte et passé. Elles sont testé par Github eux-même qui évite les "bullshit".
## Besoins

* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/)
* [React](https://fr.reactjs.org/)

## Setup
## Bdd API & Frontend

1. A la racine du projet; Run `yarn install`
2. Run `./node_modules/.bin/json-server-auth ./backend/bdd.json --port 3001` pour démarrer le serveur auth local
3. Run `yarn start` pour démarrer le serveur de développement
4. Se rendre sur [http://localhost:3000/](http://localhost:3000/)  

## Backend
1. Placez vous dans le dossier 'backend/api'
2. Run `yarn install`
3. Run `yarn dev` pour avoir le Hot-reload, sinon, `yarn start`


### Connexion user:  
- Email: `regular@example.com` ou `admin@example.com`  
- Mot de passe: `password`

#### Utilisation de l'API externe: Open Weather et affiche l'emplacement + la température


## Run tests
### Frontend
1. Placez vous à la racine du projet
2. `yarn test`

### Backend
1. cd backend/api
2. `yarn test`

### Cypress
1. Placez vous à la racine du projet
2. `yarn cypress:open`
