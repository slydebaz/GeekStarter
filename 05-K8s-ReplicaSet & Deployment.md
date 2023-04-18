![K8s logo](k8s/k8s-logo.svg)

# Déploiements et ReplicasSet

## Replication Controller

todo: ajouter shéma

Permet de créer les pods à partir de ressources de plus haut niveau. Il a pour role de garantir que le nombre demandé de POD est cohérent. Il fera ce qu'il faut pour recréer des POD si il manque.*

Il jour le role de Load Balancer

C'est une encapsulation des pods.

Le replica a la capacité de s'étirer sur plusieurs noeuds

todo: ajouter shéma 2.08 , 5.29

N.B: Vous pouvez avoir un ReplicaSet meme si vous n'avez qu'un pod
Chacune de ces ressources à son propre contexte d'application.

### Replication Controller Vs ReplicaSet

Replicacontroller est l'ancienne facon de faire.
Replicaset necessite l'usage d'un selector qui permet au replicaset de gérer des pods qui ont le meme selector mais qui 'nont pas été créés par le replicaset

Contrairment au replicaSet, le ReplicaControlleur cré les pod au demarrage mais ne présent pas l'avantage qu'à le  replciasSet à monitorer les pods.

Les labels permettent aux replicaset de savoir quels pod surveiller.


Le ReplicaSet exécute les actions suivantes:

- Creation/Suppression
- Scaling
- Rollout (mise a jour) /Rollback 
- Définir le nombre de pod dans le cluster et vérifier que ce nombre est toujours OK => utile en cas de mise a jour d'un microservice car si un pod crash alors on en redemarre un.

Replicaset utilisera son selector pour cibler les pods à surveiller
selector:
    matchLabels:
        key: value



Spec en 3 parties :

1. Details du deploiement
2. Replicaset : nombre de replicas, nombre de selector pour savoir quels pods le replicasset va regrouper
3. Pod: definition de la specification des pods qui seront lancés par le deploiement

todo: ajouter spec déploiement



N.B: une commande impérative c'est pratique mais ca ne remplacera jamais une spec





### Scale

```bash
#Replace the existing spec 
kubectl replace -f <spec-file>.yaml
```

```bash
#Scale using imperative way
kubectl scale --replicas!<number-replicas> -f <spec-file>.yaml
```

```bash
#Scale using type/name format
kubectl scale --replicas=<number-replicas> replicaset <metadata.name>
```

## Deployement

C'est une surcouche du replicaset.


Le Deployment permet de gérer le cycle de vie des pods.


Leur spec sont quasiment identiques au dela du type de controlleur utilisé



```bash
#Get all ressources deployed
kubectl get all
```


```bash
kubectl apply -f deploy.xaml
```

```bash
kubectl create deploy vote --image instavote/vote
```