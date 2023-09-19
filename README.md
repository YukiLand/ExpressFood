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

### Récuperer les infos de tout les users : POST http://localhost:8000/user/all
Body : 
```json
{}
```

Renvoie les informations de tout les users

### Récuperer les uuid de tout les users (back only) : POST http://localhost:8000/user/all
Body : 
```json
{}
```

Renvoie les noms, prénoms et uuid de tout les users

### Supprimer un user : POST http://localhost:8000/user/delete
Body : 
```json
{
    uuid: ""
}
```

Renvoie une confirmation de suppression

## Meal

### Créer un repas : POST http://localhost:8000/meal/create
Body : 
```json
{
    "name": "Poulet patate",
    "description": "C'est un poulet qui met des patates",
    "image": "https://static.750g.com/images/1200-630/6c696cbbf34e9d701b0dfa731283fa47/cuisses-de-poulet-et-pdt-au-four.jpg",
    "category": "meal",
    "price": "20 EUR"
}
```

Renvoie une confirmation de création

### Lister les repas : POST http://localhost:8000/meal/search
Body : 
```json
{
    "category": "desert" //Renvoie tout les désserts
    "category": null     // Renvoie TOUT les repas
                         // Si body vide renvoie TOUT les repas
}
```

Renvoie la liste des repas concernés

### Supprimer un repas : POST http://localhost:8000/meal/delete
Body : 
```json
{
    "uuid": ""
}
```

Renvoie une confirmation de suppression






