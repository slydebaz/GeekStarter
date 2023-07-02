# Les composants

ensemble de classes/fonctions regroupes ensemble et deployable independemment

3 regles:

- ne doit etre resposable que d'une seule couche: soit UI, metier ou data. il ne doit pas traverser de frontiere
- une nouvelle feature ne doit concerne un seul composant de chaque couche
- une classe qui utilise une interface appartient au meme composant
- la classe qui implemente une interface vit dans un autre composant


classe = atome
module = mollecule


## 3 principes

Un compoant ne peut pas respecter ses trois principes en meme temps

### Reuse / release Equivalence Pricinple
Avoir des gros composants
Augmenter la reutilisation d'un package
Minimiser les release


Regrouper les fonctions qui partagent un theme commun et pouvant etre retutilisées par d'autres composants
versionning et distribution automatique

Exemple: Classes utilitaires et génériques, React

### Common Closure Principle
Avoir des petits composant specifique
Regrouper ensemble les choses qui vont evoluer et bouger ensemble

SRP a l'echelle du composant.

Centraliser l'impact d'un changement et d'uen nouvelle feature

Ideal pour le code metier qui contient les regles businness, celle que l'on doit tester au maximum

Exemple: Composants metiers

### Common Reuse Principle

Ne pas forcer les utilisateur d'un composant a dependre d'un composant dont il na pas besoin: exemple un nouveau produit qui vient dependre de la code base d'un autre produit

Reduire le nombre de composant a mettre à jour lorsque l'on met a jour notre composant

ISP a l'echelle du composant.

exemple: Composant d'infrastructure: NodeFS


