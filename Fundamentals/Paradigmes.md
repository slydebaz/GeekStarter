
# Le paradigmes de programmation

## Structured Programming

Djikstra
Tous les programmes sont constitués des actions suivantes
Theoreme de Bohm-Jacopini
- Sequence
- Selection
- Iteration

La programmation modulaire est basée sur l'usage de ces 3 blocs. On obtient un code plus senquetiel et lineaire

=> Le transfert de controle direct: On ne jump plus ou on veut => Goto est à proscrire

=> le code devient plus prévisible

## Object Oriented Programming

les années 60
Ole Johan Dahl & Kristen Nygaard (Simula)


POO: 
- Encapuslation: cacher les details d'implementation
- Heritage: retutilisation des comportements
- Polymorphisme: gestion des comportement différents
-- surcharge
-- paramétrique


Permet d'inverser les flux des dependances
Les flux d'execution et de dependances vont dans le meme sens.

L'interface va permettre d'inverser le sens de dependance: Repository Pattern avec le Dependency Inversion

=> Le transfert de controle indirect: on peut passer un objet en parametre d'un fonction sans avoir a connaitre le type concret de l'objet

## Functionnal Programming

Alonzo Church (1936) en parallele des recherches d'Alan Turing (calcul Lambda). Travaux autour de de resolution et la prise de decision: Les algorithmes.

Traduire le nombre d'inconnu sur un probleme donné

Tout n'est pas solvable via un algorithmes et il n'existe pas de machine qui puisse répondre à toutes les questions.

Pratique pour resourdre des problemes de:
- concurrence 
- race condition
- deadlock
- parallele

Immutabilité: On ne peut changer une valeur une fois initialisée
Idem potence: Comportement deterministe, le resultat sera le meme a chaque fois avec les memes paramètres => pratique comme principe pour faire des tests

Functionnal Shell
Imperative Core

=> reduire la complexite cognitive en nous aidant a conceptualiser nos interfaces. Elle va rendre plus simple la compréhension de l'architecture, des composants et de leur relation => pratique dans la Clean Architecture





