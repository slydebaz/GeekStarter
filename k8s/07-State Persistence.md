![K8s logo](k8s/k8s-logo.svg)

# State Persistence

## Rappel sur la gestion des données dans les containers

Les conteneurs , au même titre que les pods ont une nature transciente par nature. 
Lorsque les containers applicatifs sont supprimées,les données le seront aussi. 
 
Afin de dissocier les données du cycle de vie des containers, on fait appel à des volumes que l'on bind aux containers applicatifs. Ainsi le conteneur peu etre detruit sans que cela entraine la destruction du volume.


## Problématique liée à la clusterisation de l'infrastructure sur plusieurs nodes

Sur un cluster distribué d'entrerprise, on a probablement plusieurs noeuds. Il faut pouvoir accéder aux données sans supposer d'ou est fait la demande d'accès.
Contrairement à ce que l'on fait avec les docker de facon assez statique en bindant le reptoire de données aplicative du conteneur vers le , il n'est pas recommandé de faire de même sur un cluster car les données ne se trouvent très probablement pas sur le même noeud.


todo: 3.34


Deux types de volumes:
* Volumes
* PersistentVolumes


## Volumes

Détaché du cycle de vie d'un pod
Tous les containers dans un pod peuvent partager le volume

Basiquement on peut faire un montage de volume un peu comme avec les dockers. Cela fonctionne bien sur un seul noeud mais pas quand on en a plusieurs 


K8s supporte différentes solutions de stockage: NFS, GlusterFS, Flocker, ScaleIO, AWS EBS, GCP, Azure, CEPH ...


emptyDir: permettra de definir un volume dans le pod mais qui aura le meme cycle de vie que ce dernier. Les données seront supprimée à la suppression du pod

```yaml 
#Creation d'un volume associé à un POD
apiVersion: v1
kind: pod
metadata:
    name: random-number-generator
spec:
    containers:
    -image: alpine
     name: alpine
     command: ["bin.sh", "-c"]
     args: ["bla", "bla"]
     volumeMounts:
     - mountPath: /opt 
       name: data-volume

    volumes:
    -names: data-volumes
     hostPath:
        path: /data
        type: Directory
```

Exemple: Pour AWs on va remplacer hostPath par:

```bash 
#Creation d'un volume associé à un POD
awsElacsticBlockStore:
    volumeID: <id>
    fsType: ext4
```


## PersistentVolume

L'usage de volume répond au besoin de dissocier les cycles de vie du POD des données qu'il manipule. Cependant cela n'est pas suffisant pour gérer le cas ou l'application est réportie sur plusieurs noeuds. On cherche également un moyen d'éviter que les utilisateurs qui vont déployer le POD aient une connaisance de là ou se trouve les données ne majotant la configuration du volume dans la spec du pod.

todo: schema 1.38

La stratégie valide revient à centraliser les volumes de l'nfrastructure en créant un pool de stockages.

Coté administration, on va créer des PersistentVolume (PV) qui des vont référencer le pool de volumes accessibles. 
Les utilisateurs vont pouvoir utiliser les volumes en passant un des objets de type dans un PersistenceVolumeClaim (PVC).

Dans les PV on va définir:

* les modes d'accès (ReadWriteOnce / ReadOnlyMany / ReadWriteMany)
* la capacité
* ...

```yaml 
#Creation d'un PersistentVolume
apiVersion: v1
kind: PersistentVolume 
metadata:
    name: pv-volume 
spec:
    accessModes:
        -ReadWriteOnce / ReadOnlyMany / ReadWriteMany
    capacity:
        storage: 1Gi
    awsElacsticBlockStore:
        volumeID: <id>
        fsType: ext4
```

```bash 
#Liste des PersistentVolume
kubectl get PersistentVolume
```

## PersistentVolumeClaim

Cet objet cré des requetes qui permettent de se binder automatiquement sur des volumes qui correspondent à la demande (claim) : Capacité,, Mdoes d'accès, Volume mode, Classe de stockage, selector

Tips. Il est possible de cibler un PV depuis un PVC en définissant un seleteur sur le PVC, et un label sur le PV

N.B. Un PVC restara dans un état Pending tant qu'il n'y aura pas de PV correspondant sur le cluster

```yaml 
#PersistentVolume
apiVersion: v1
kind: PersistentVolume
metadata:
    name: pv-vol1
spec:
    accessModes:
     - ReadWriteOnce
    capacity:
        storage: 500Mi
    awsElasticBlockStore:
        volumeID: <volume-id>
        fsType: ext4

```

```yaml 
#PersistentVolumeClaim
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
    name: pvc-1
spec:
    accessModes:
     - ReadWriteOnce

    resources:
     requests:
        storage: 500Mi
```

```yaml 
#Pod
apiVersion: v1
kind: pod
metadata:
    name: random-number-generator
spec:
    containers:
    -image: alpine
     name: alpine
     command: ["bin.sh", "-c"]
     args: ["bla", "bla"]
     volumeMounts:
     - mountPath: /opt 
       name: data-volume

    volumes:
    -names: data-volumes
        persistentVolumeClaim:
            claimName: pvc-1
```

### Suppression d'un PVC

Lors de la suppression d'une claim, on peut choisir la politique appliquée pour la conservation du Volume

persistentVolumeReclaimPolicy: 

* Retain (default): les données du PV ne sont pas supprimées et nécessitent une aciton de la part de l'administrateur

* Delete: suppression automatique du PV

* Recycle


Tips: dans la mesure du possible il est préféreable de limiter l'usage des StatefulSets
Si il y a besoin de gérer une BDD alors on préférera utiliser une BDD cloud : Db as as service

Le principe de K8s est de définir des ressources qui sont amenées à changer assez souvent, ce qui n'est pas le cas des BDD


Dans la réalité, votre stockage sera administré par un provider.
Le standard CSI permet aux providers de fournir de plugin qui vous permet de lier votre cluster a votre volume

Static Provisonning: Le disque est créé manuellement avant le PersistentVolume

gcloud beta compute disks create --size 1GB --region us-east1 pd-disk

```yaml 
#PersistentVolume
apiVersion: v1
kind: PersistentVolume
metadata:
    name: pv-vol1
spec:
    accessModes:
        - ReadWriteOnce
    capacity:
        storage: 500Mi
    gcePersistentDisk:
        pdName: pd-disk
        fsType: ext4
```

Dynamic Provisonning: 
Automatically provisionne stockage sur le provider et l'attacher au Pod quand le claim est fait

Le but est de passer par un objet StorageClass pour créer automatiquement un PV.
Dans le storage on va dire quel provider cibler

On peut alors définir plusieurs standard de stockage (silver/gold/platinium)

```yaml 
#StorageClass
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
    name: google-storage
provisionner: kubernetes.io/gce-pd
parameters:
    type: pd-standard               =>ces paramètres sont propres au provider
    replication-type: none
```

```yaml 
#PersistentVolumeClaim
apiVersion:v1
kind: PersistentVolumeClaim
metadata:
    name: myclaim
spec:
    accessModes:
        - ReadWriteOnce
    storageClassName: google-storage
    resources:
        requests:
            storage: 500Mi

apiVersion:
kind: Pod:
metadata:
    name: random-number-generator
spec:
    containers:
```