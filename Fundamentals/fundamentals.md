2009: manifeste du software craftmanship
4 axiomes:
logiciels opérationnels et bien concus
ajout constant de valeur
valoriser la communaute
favoriser les partenariats productifs


Craftmanship: etat d'esprit et professionalisme - Sandro Mancuso


* Mesurer l'efficacité et la qualité d'un logiciel 

Important: ce sont des guides, pas des objectifs

stabilite:
	nombre de bug générés apres une mise en production
	combient de temps pour revenir à un etat stable

fréquence de déploiement (throughput):
	lead time - time to market: temps necessaire pour passer d'une idée à la mis ea dispo de l'utilisateur
	frequency: vitesse à laquelle les changemnts sont publiés en production

Un logiciel de qualité est un logiciel dont le cout d'evolution est constant dans le temps.
C'est l'opposition du waterfall developpement qui vise a essayer de tout predire avant la phase de développement alors que c'est la qu'on en sait le moins sur le produit.
Le developpement logiciel reste une discipline emprire ou il faut accepter que l'inconnu fait partie de l'équation du problème. On doit donc avancer tout en se laissant le plus de portes ouvertes via un code modulaire.

La modularité permet de diviser un probleme complexe en sou problemes de plus faible complexites.


*Feeback

C'est un trnasmission d'information corrective a propos d'une action, d'un evenement ou d'un processus. Il permet d'établir des preuves pour appuyer des décision" - Dave Farley
Une feedback rapide permet d'avancer rapidement ET régulierement 


Dans le logiciel ca se traduit par:
- de sretours utilisateurs
- les tests de tout types
	2 boucles: 
	- boucle 1 : < 5min => 80 % de confiance
	- boucle 2 : 1 heure => 20 % restant	

- intégration continue
- gestion de configuration: chaque commit est releasable => trunk based developpement (acunue branche car isolatino des changements, donc isolation du feeback)

Accelerate Nicole Forsgren


* Test Unitaire

AAA
FIRST
Fast: execution rapide
Idependant: chaque test met en place sont propre etat initial et son etat final. Rien ne persiste au dela de la portée du test
Repeatable: test deterministe, retourne toujours les memes resultats
Self Validating: On doit pouvoir constater immediatement si un test est OK/KO => Green/Red
Thorough (Complet): Tous les scenarri d'un test

Lisible et concis


Injection de dépendance
Exemple avec random

** Les tests doubles : doublures

https://knplabs.com/fr/blog/mocks-fakes-stubs-dummy-et-spy-faire-la-difference/

dummy: objet qui permet d'exploiter la methode a tester enle passant en paramètre
spy: pemret d'enregistrer comment ils ont été appelés
stub: definir un objet preconfiguré
fake: stub ++ c'est une implementation falsifiée. Ca peut meme servir pour les démo. Il faut que ca reste simple pour éviter d'avoir a faire des TU sur les objets fake


mock: objet plus complexe, creation d'un objet identique spy + stub. Attention car ne permet pas de se decoupler de l'implementation

Pour rédiger un TU, il faut définir un contrat d'intéraction avec l'exterieur

Pour avoir un test lisible il faut supprimer les details qui ne sont pas necessaires à la compréhension du test et donc du usecase qui est testé

quelques pattern pour créer des tests clairs:

** Pattern Helper / Object Mother
Ce sont des objets qui ont pour objectifs de créer les objets pour nous en masquant la complexité inutile comme les valeurs par defaut

createTaskWitouhDueDate(text)
createTaskWithDueDate(text, dueDate)

** Pattern Builder 
Permet de construire des objets au fur et a mesure
API Fluent: plus verbeux mais plus comprehensible
Avantage: preconfigurer un objet

tache = taskBuilder.withText("Acheter du lait").withoutDueDate().build()


DAMP: Descriptive And Meaningful Phrases
=> syntax Gherkin avec des fonction qui encapsulent les tests

=> on va chercher à etre DRY tout en etant DUMP en maximisant la réutilisabilité des helpers. On cré des fixture

On test ne doit echoué que si le comportement a changé ou qu'il a été mal implémenté.

On va tester les point d'entrée du usecase en passant par les méthodes publiques.
Il y a plusieurs écoles:

La différence est sur la manière ou est isolée le code 

Un test a pour objectif de tester un comportement métier dirrigée par une intention utilisateur executée sur une état initial sur système, état que l'on va pouvoir vérifier par la suite

** Chicago School (Sociable Tests): 
une unité de test peut embarquer plusieurs classes (collaborateurs)
On ne remplace que les accès externes
isolation des dependance externe.  car ils parlent a plusieurs collaborateurs. 
** Londres School (Solitary Tests): 
 unité c'est la classe
on isole tous les collaborateurs de le classe. 
Les tests vont ciblés chaque collaborateurs. 
Approche plus fragile car on teste des détails d'implémentation

Les gens sont découragés car bien souvent les tests testent les implémentation et non les comportements. C'est decourageant car on passe du temps a maintenir des tests alors que les comportement ne changent pas.

Les testent doivent etre sensibles aux comportement et non aux changement de structures

Dan North => BDD mais behaviour doit resté focailisé sur les aspects métiers

Ca revient a dire qu'il ne faut pas faire un test pour une fonction de manière isolée mais bien tester un usecase qui a un point d'entrée, 
qui sollicite différents acteurs dont on connait la manière dont ils doivent réagir.

* architecture hexagonale 'alistair cockburn'

2 parties dans une application: user side et server side

Le coeur de métier ne doit pas dependre de l'exterieur => inversion de dependance

** ports & adapters: 
ports: 
contrat d'interface
N.B: ce n'est pas un port au sens port applicatif 8080, 80 etc mais plus au sens posrt USB pour se connecter a un systeme

les adpateurs viennent se brancher sur les ports. C'est la clé usb

Partie gauche / les primary / user side / driving adapteurs
Partie droite / les secondary / les server side / les driven adapaters

** Amelioration lecture des tests


* Le paradigmes de programmation

** Structured Programming


** Object Oriented Programming


** Funcionnal Programming




























