![K8s logo](k8s/k8s-logo.svg)

# Déploiements et R2plicasSet

todo: ajouter shéma

Permet de créer les pods à partir de ressources de plus haut niveau.
chacune de ces ressources à son propre contexte d'application.

C'est un controller.
Replicacontroller est l'ancienne facon de faire.

Permet de monitorer des pods labellises.

Le Deployment permet de gérer le cycle de vie des pods.
Le ReplicaSet exécute les actions suivantes:

- Creation/Suppression
- Scaling
- Rollout (mise a jour) /Rollback 
- Définir le nombre de pod dans le cluster et vérifier que ce nombre est toujours OK => utile en cas de mise a jour d'un microservice car si un pod crash alors on en redemarre un.

Replicaset utilisera son selector pour cibler les pods à surveiller
selector:
    matchLabels:
        key: value

La spec d'un deploiement contient la spec des pods qui seront gérés par ce deploiement

Spec en 3 parties :

1. Details du deploiement
2. Replicaset : nombre de replicas, nombre de selector pour savoir quels pods le replicasset va regrouper
3. Pod: definition de la specification des pods qui seront lancés par le deploiement

todo: ajouter spec déploiement

kubectl apply -f deploy.xaml
kubectl create deploy vote --image instavote/vote

N.B: une commande impérative c'est pratique mais ca ne remplacera jamais une spec


