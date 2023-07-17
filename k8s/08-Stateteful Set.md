![K8s logo](k8s/k8s-logo.svg)

# Stateful Set

## Rappel sur la gestion des données dans les containers

Ca ressemble fortement un un Deployments

Vous aurez besoin de définir un service mais qui devra être de type headless

Le type Stateful va creer les pods qui doivent etre repliqués up/down de manière ordonnés.

Un statefulset a un unique Id reseau.

Exemple: le cas d'une BDD, une nouvelle réplique sera créée une fois que la précédente sera opérationnelle
