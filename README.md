# ExpressFood
School projet for the week 09/18 to 09/22

# Fonctionnement du projet

Pour démarrer le backend :
- Se rendre dans le dossier serveur
- Créer un fichier .env dans lequel vous viendrez mettre vos informations de connexions à la bdd, ex : ATLAS_URL=mongodb+srv://username:password@apimern.hnpiqzi.mongodb.net/ExpressFood?retryWrites=true&w=majority
- Ouvrir un terminal et faire **npm i** pour installer tout les packages de nodes nécessaires au projet
- Faire la commande **nodemon server.js** et le serveur devrait être démarré

  
# Les entités

## User
```json
{
    "firstname": "Antoine", // A saisir via le front
    "lastname": "Lecoffre", // A saisir via le front
    "email": "antoine.lecoffre@orange.fr", // A saisir via le front
    "password": "mmotdepassedetest",  // A saisir via le front
    "phonenumber": "+335654415421", // A saisir via le front
    "postalAdress": "20 rue de la paix, 33000 Bordeaux", // A saisir via le front
    "role": "customer", // auto généré par le back, si on souhaite le changer -> changement directement en bdd pour transiter de customer à admin
    "token": "adaz4dc65az4fdae4f65aze4f5zea4f65fd4ez6fze4fze4fz6e", // auto généré par le back
    "uuid": "zefezfze-fezgvf-devbez-fgze45fze", // auto généré par le back
    "creationDate": "2023/09/20", // auto généré par le back
}
```

## Meal
```json
{
    "uuid": "zefezfze-fezgvf-devbez-fgze45fze", // auto généré par le back
    "name": "Poulet Patate", // A saisir via le front
    "description": "C'est un poulet au patate", // A saisir via le front
    "image": "https://www.google.com", // A saisir via le front
    "category": "meal", // A saisir via le front
    "stockQuantity": "20" // A saisir via le front
    "price": "15", // A saisir via le front
    "creationDate": "2023/09/20", // auto généré par le back
}
```

## Order
```json
{
    "customerUUID": "gaz56drf4a56z-51aezfaz-azdazza" // Correspond à celui du User connecté
    "employeUUID": "4546az4d6-456azef-aezf456az" // Correspond au uuid du livreur selectionné
    "meal": [ tableau d'objet des repas sélectionnés, /!\pensez à rajouter dans l'objet la quantity/!\]
    "orderDate": "" // auto généré par le back
    "creationDate": "" // auto généré par le back
    "uuid": "a5z4d56af4-4aze5f4a-azef", // auto généré par le back
    "totalAmount": "89.4 EUR", // auto calculé par le back (prend le price et la quantity renseigné et les additionnes)
    "deliveryFee": "", // auto calculé par le back
    "status": "", // Voir la liste


Liste statuts:
- CreationInProgress -> Création de la commande et ajout de plat dans le panier (Statut par défaut lors de la création, aucun impact front)
- CartValidated -> Commande validé, paiement à effectuer ( lorsque le back recois ce statut le calcul du panier et des frais de livraisons se fait)
- Paid -> Commande payer (a ce moment la le back soustrait les quantités commandés des quantités en stock pour les plats concernés)
- Delivered -> Commande livrée
}
```

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
    "uuid": "", // Renvoie LE plat concerné
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

## Order

### Créer une commande : POST http://localhost:8000/order/create
Body : 
```json
{
    "customer_uuid": "589af341-4a3a-4d7d-a8f5-469c3c9b896b",
    "meal": [
                {
                    "name": "Poulet patate",
                    "description": "C'est un poulet qui met des patates",
                    "image": "https://static.750g.com/images/1200-630/6c696cbbf34e9d701b0dfa731283fa47/cuisses-de-poulet-et-pdt-au-four.jpg",
                    "category": "meal",
                    "price": "20 EUR"
                }    
        ]
}
```

### Editer une commande : POST http://localhost:8000/order/update
Body : 
```json
{
    "uuid": "48c56f26-2409-4ee8-bdb5-e09613925409", // uuid de la commande déjà créer
    "customerUUID": "589af341-4a3a-4d7d-a8f5-469c3c9b896b", // uuid du client qui passe la commande
    "status": "Validated", // statut à faire évoluer au fil de la commande
    "meal": [
            {
                "name": "Poulet patate",
                "uuid": "a6404d7a-22fb-4233-b445-ae28481df7aa", // uuid du plat
                "description": "C'est un poulet qui met des patates",
                "image": "https://static.750g.com/images/1200-630/6c696cbbf34e9d701b0dfa731283fa47/cuisses-de-poulet-et-pdt-au-four.jpg",
                "category": "meal",
                "quantity": 1,
                "price": "20 EUR"
            },
            {
                "name": "Poulet pas patate",
                "uuid": "", // uuid du plat
                "description": "C'est un poulet avec des haricots verts",
                "image": "https://static.750g.com/images/1200-630/6c696cbbf34e9d701b0dfa731283fa47/cuisses-de-poulet-et-pdt-au-four.jpg",
                "category": "meal",
                "quantity": 2,
                "price": "15 EUR"
            }
    ]
}
```



### Supprimer une commande : POST http://localhost:8000/order/delete
Body : 
```json
{
    "uuid": ""
}
```






