# S.O.L.I.D

Robert C Martin (80, officialisé en 2004)

LE plus gros probleme de l'ingenerie logiciel est l'entropie,, les personnes qui quitte et rejoigne les projets, la deterioration inevitable du produit avec le temps qui passe et les fonctionalites qui s'ajoutent

Concu pour les classes mais utilisables à l'echelle des modules ou Services

Ce sont des principes qui nous guide pour développer des programmes maintenables: facilement, modifiables robustes et simple à comprendre

## SRP (acteurs)

Une classe ne doit avoir qu'une seule raison de changer
Une classe ne doit etre responsable que d'un seul acteur.
Sinon on prend le risque d'avoir desobjets qui font trop de chose

favorise l'independance des objets. plutot pratique pour travailler en parallele ou eclater une architecture monolithique en microservice


## OCP (contrats)

Ouvert au evolution, fermé aux modification.
On ne casse pas un contrat définie, on l'enrichit avec de nouvelles methodes

Introduire un dependance dans un objet peut lerendre instable

## Liskov (equivalence)

Une classe qui implemente un contrat doit etre parfaitement substituable par une autre qui implemente le meme contrat.

On ne modifie pas le contrat pour s'adapter a une classe concrte car toutes celle qui en dependent vont devoir faire de meme

## Interface Segregatino Principle (specificite)

Minimiser l'incidence que doit avoir un changement dans une classe qui est trop générique
On va s'orienter vers des objets specialisés et donc qui ne sont pas génériques.
Comme on n'est pas générique on ne va donc pas pouvoir etre reutilisable

A l'usage on va essayer d'avoir des objets qui ont une signature qui sollicite des objets le plus adatpé et pas des objets enorme un peu fourre tout

Minimiser l'incidence d'un changement dans une classe qui est trop generique

Common Reuse Principle: Gros modules reutilisables pour eviter les duplication

Reuse Release Equivalence Principle: Plein de petits modules specifique et independants les une des autres

Minimiser la généricité va donc demander de créer plus classe specifique et donc augemente la surface de code et de manière naturelle la quantité de bug possibles ou faille de securité


## Dependency Inversion Principle (inversion de controle)

Permet a la Clean Architecture d'exister en premier lieu
Les modules de haut niveau ceux qui contiennent la logigue ne doivent pas dependenre directement des modules de bas niveau qui contiennent des implementations propres a des services tiers (bdd, notification, request etc...). Il doit y avoir une interface entr eles deux

LEs details techniques peuvent evolues independamment de l'application: changement de BDD, framework HTTP, export PDF ....

Les dependances doivent etre presentes dans le constructeur de l'objet. Ca donne aussi une lecture assez claire de ce qui est sollicité par l'objet. => dependance implicite donc pas testable si on souhaite piloter le comportement de la dependance pour tester notre classe

Les dependances vont dans le sens opposé au flow de l'application

Application: point d'entrée de l'application
Domaine
Infrastrcuture



Minimiser 