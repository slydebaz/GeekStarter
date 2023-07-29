

# Clean Architecture

## Architecture: definition

Robert C. Martin - "Uncle Bob" (2012)

https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

Objectif:
MAximiser la productivité des développeurs
Faciliter le changement du système
Faire évoluer le système selon les besoin actuels
MAximiser la rentabilité du business

Stratégie: laisser ouvert le maximum d'options possibles


On repousse les choix technologiques le plus tard possibles

## Architecture 3 couches

Presentation
Métier

    Domain Modeling
    Domain Driven Design
    Functionn Programming (Mutable Shell)
Data

On a longtemps eu des application data centric au lieux d'etre ebusiness centric.
Tout depend de la modelisation de la couche de données
L'infrastructure est assez volatile. la couche donnée peut evoluer pour des raisons bien différentes de la couche metier: changement ORM, BDD, Schema. L'impact peut etre conséquent sur les couches du dessus. Le fait est qu'on depend de quelque chose de concret => inverser le sens des dependances afin de remettre le domaine au centre de l'architecture qui est stable par nature car assez abstrait.
Il va alors pouvoir evoluer de manière autonome

LE domain ne depend de rien

 
On souhaite avoir le pouvoir sur les details que sont : les framework, librairies, base de données

## Architecture Hexagonale

Alistair Cockburn 2005

Basée sur l'inversion de dépendence grace aux interfaces

ARchitectur e: Port / Adapateurs.

Les ports sont les interfaces
Les adapteurs sont coté infrastructures et implémentes les interfaces

Utilisable en front et back

L'architecture hexagonale donne seulement un acdre de travail basé mais ne nous renseigne en rien sur la manière de structuré le domaine
=> la clean architecture propose une structure de ce noyau

## Clean Architecture

Rocbert C Martin 2017
45 ans d'XP

Objectif: concevoir des applications robustes et evolutives tout en maintenant notre productivité à mesure que le programmae grossit

Dans la partie metier, chaque usecase va representer une feature

La clean architecture repose sur l'architecture hexagonale mais se recentre l'application sur les usecase 


On va appeler des usecase metier depuis différents types d'éléments: api, cli , socket, message bus ... 

Les controlleurs dependent du usecases
Les usecases utilisent des entites
Les entitész ne savent rien des classes concretes de l'infrastructure

chaque Feature est implémenté à travers un usecase
les dependances vont vers le domaine grave à l'inversion de dependance
l'application est decoupée en composant suivant les principes de cohesion et de couplage

l'application doit crier son intetion (SREAMING ARCHITECTURE)


### Les controleurs

Situé dans la partie infra
chaque facon de rentrer dans l'applciation est representée par un controlleur
1 controlleur par feature
pas de logique métier dans les controlleurs

### Les Usecase

Decrit une interaction et un acteur du système
Possède un modele de requete et un modele de reponse
Usecase = Fine Grained Interface 
Service = Wide Inrefaces

Les TU vont se concentrer sur les usecases

### Les Entités & Repository

Objet riche en logique métier
Encapsule la donnée et le comportement de ce métier
C'est une unité de persistence et aussi de réponse 

Repository: Implemente l'interface et recupère les entité dont il a besoin.
            Change les données brut en données entités

Important: les données de la DB ne sont pas les memes que celles du domaine


L'adapter a pour role de faire le mapping, la anslation, l'hydradatation

### Presenter

Formatte la donnée renvoyée à l'utilisateur
Très peu de logique dedans
C'est interface publique de l'utilisateur

### Sreaming Archtitecture

Objectif: refleter l'intention et l'utilisation de l'application

On essaiera d'avoir une classe par usecase pour faciliter la comprhension de systeme
On va regrouper les fetaure entre elles pour éviter d'avoir modifier tout le compte nécessaire

### Package By Feature

## Approche classique
Regrouper par couche, avec un dossier par couche (View Controller, Model)

## Clean Architecture
Les usecase sont au centre

Organisation par fonctionnalité ou par composant
Chaque dossier contient tout le code necessaire à la feature. Est conforme au common closure principle.
Necessite uniquement de redeployer le composant et favorise le parallelisme
Reduit la complexité cognitive

Chaque usecase va avoir sa paire de message request/response
Les usecases vont manier les entités du sytème
D'ordre générale on aura un controlleur par entité





