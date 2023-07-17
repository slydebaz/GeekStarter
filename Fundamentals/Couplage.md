# Couplage

Relation entre les composants ?

3 Principes pour:
- Reduire le couplage et stabiliser l'infra.
- Determiner les relation entre un composant métier et un composant d'infrastructure


## Les axes d'un composant
Stabilite: plus un composant est diffcile a changer, plsu il est stable
Volatilité: plus un composant a besoin de changer, plus il est volatile
Abstraction: Plus le composant possede de classes abstraite, plus le composant lui meme est abstrait

## Acyclic Dependencies Principle
Ce sont les depenance cyclique. Il faut une hierachie ne serait que pour avoir un ordre de deploiment


## Stable Dependencies Prcinple
Un composant stable ne doit pas dependre d'un composant volatile car les changement vont destabiliser les composants stables
L'utilisation d'interface favorise la stabilité car elle evoluent assez peu

On construira des composant qui sont de plus en plus stables

L'application doit etre orientée autour des regles metiers

Toutes les dependances vont converger vers un point central qui sera le plus stable de l'application

## Stable Abstrctions Principle
Les composants les plsu stables sont les plus abstraits possibles

Un composant peut etre a la fois stable et volatile: les regles metiers

On depend des contrat et non des implementations (concretions)



### Matrice de position

            Abstrait    Concret
Stable      Bien        Douloureux
Instable    Inutile     Bien

Composant Stable + Concret: Acrhitecture sur laquelle on depend directement de la data









