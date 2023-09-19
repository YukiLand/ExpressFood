# ExpressFood
School projet for the week 09/18 to 09/22

# Fonctionnement du projet

Pour démarrer le backend :
- Se rendre dans le dossier serveur
- Créer un fichier .env dans lequel vous viendrez mettre vos informations de connexions à la bdd, ex : ATLAS_URL=mongodb+srv://username:password@apimern.hnpiqzi.mongodb.net/ExpressFood?retryWrites=true&w=majority
- Ouvrir un terminal et faire **npm i** pour installer tout les packages de nodes nécessaires au projet
- Faire la commande **nodemon serveur.js** et le serveur devrait être démarré

# Les API

## User

### Inscription : POST http://localhost:8000/user/signup
Body :
```json
{
    "firstname": "Antoine",
    "lastname": "Lecoffre",
    "email": "antoine.lecoffre@orange.fr",
    "password": "mmotdepassedetest"
}
```

Renvoie un message pour dire que l'user à bien été créer

### Connexion : **POST** http://localhost:8000/user/login
Body :
```json
{
    "email": "antoine.lecoffre@orange.fr",
    "password": "mmotdepassedetest"
}
```

Renvoie le token d'identification de l'utilisateur connecté

### Vérifier le token : POST http://localhost:8000/user/check/token
Body : 
```json
{
    "token": "token"
}
```

Renvoie un message confirmant la validité ou non du token

### Récuperer les infos d'un user : POST http://localhost:8000/user/get
Body : 
```json
{
    "token": "token"
}
```

Renvoie les informations du user voulu







