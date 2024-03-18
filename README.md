# Umanao Nuxt3

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Nuxtjs](https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Setup
### Avec Docker
Docker avec docker-compose et Dockerfile
```bash
docker-compose build
docker-compose up -d
```
#### Avec makefile
Installation des dépendances grâce au makefile
```bash
make install
```
Lancement du serveur de developpement
```bash
make dev
```
#### Sans makefile
```bash
docker-compose exec app sh // Droit root
docker-compose exec -u 1000:1000 app sh // Droit utilisateur
```
Une fois dans le container 
```bash
npm install
npm run dev
```

#### Accès à l'application <br/>
Une fois le serveur lancé <br/>
Vous pouvez aller sur l'adresse local et le port 3000 <br/>
exemple : http://localhost:3001

### Sans Docker
Allez dans le répertoire vous où avez cloné le repo :
```bash
npm install
```
Puis lancer le serveur de développement
```bash
npm run dev
```

Une fois le serveur lancé <br/>
Vous pouvez aller sur l'adresse local et le port 3000 <br/>
exemple : http://localhost:3000
