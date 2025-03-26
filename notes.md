## Commandes de base

```sh
npx tsc --init // Créer un fichier tsconfig.json
npx tsc // Compiler le projet

```

## Définitions

**Une route** : Association entre une URL et une methode HTTP
**Un middleware** : Fonction qui s'execute entre la requête et la réponse
**Inférence de type** : Capacité de TypeScript à déterminer le type d'une variable à l'aide de la donné qui sert d'initialisation
**String literal** : Capacité de TypeScript à insérer des variables dans une chaine de caractères à l'aide de ${} dans une chaine avec des backticks
**Interface** : Définition de la structure d'un objet

## API REST

**Representational State Transfer** : Architecture de développement web qui utilise les méthodes HTTP pour effectuer des opérations sur des ressources
**Stateless** : Absence de stockage de l'état du client sur le serveur
**Basé sur des ressources et leur état**
**Architecture pour systèmes distribués**
**Interface uniforme**

### Principes clés

- **Ressources** : Entité idénifiable par une URI
- **Représentation** : Format de données d'une ressource (JSON, XML)
- **Méthodes HTTP** : Actions standardisées

### Méthodes HTTP

- **GET** : Récupérer une ressource
- **POST** : Créer une ressource
- **PUT** : Mettre à jour une ressource
- **DELETE** : Supprimer une ressource
- **PATCH** : Mettre à jour partiellement une ressource

### Status code HTTP

- **1xx** : Information
- **2xx** : Succès
- **3xx** : Redirection
- **4xx** : Erreur client
- **5xx** : Erreur serveur

### Conception des Points d'accès (Endpoints)

- **Centré sur les ressources** : Utiliser des noms de ressources plutôt que des verbes
- **Collection** : Ressources multiples, au pluriel
- **Hiérarchie logique** : Utiliser des routes imbriquées pour les ressources imbriquées
- **Cohérence** : Utiliser des conventions pour les noms de routes

## Comparaison entre REST, GraphQL et gRPC

### REST

- Le plus simple, classique
  > Usage : API publiques, architecture simple, ressources distinctes

### GraphQL

- Conf plus comlplexes
- Requetes plus precises
- Endpoint unique
  > Usage : Interfaces complexes, clients multiples, requetes imbriquées

### gRPC

- Plus performant
- Moins adapté au web
  > Usage : Communication interne, microservices, services en temps réel

## MVC

- **Model** : Gestion des données
- **View** : Présentationn des données
- **Controller** : Logique de l'application, gestion des requêtes et réponses

## Validation des données

- **Pourquoi ?** : Prévenir les erreurs, garantir la qualité des données et améliorer la sécurité
- **Niveaux de validation** :
  - **Frontend** : Validation côté client / UX
  - **Middleware** : Validation côté serveur avant traitement
  - **Service** : Validation en fonction des règles métier
  - **Base de données** : Contraintes de base de données

## Authentification et Autorisation

- **Authentification** : Vérifier l'identité de l'utilisateur
- **Autorisation** : Vérifier les droits de l'utilisateur
