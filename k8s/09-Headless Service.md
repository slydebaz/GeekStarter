![K8s logo](k8s/k8s-logo.svg)

# Headless Service

## Rappel sur les service

Un service permet d'exposer une adresse IP unique et un nom de domaine unique pour un déploiement.

Il officie comme un load balancer. C'est engénérale très pratique sauf si les pods ne doivent pas avoir tous les mêmes comportements.
Les adresses Ip des pods sont dynamiques et vont changer à chaque redémarrage des pods.

Exemple: Dans le cas d'un cluster de base de données, on aura le master sur lequel on peut écrire, et les répliques déstinées à la lecture uniquement.

L'usage d'un service classique ne permettra pas de faire cette distinction de comportement car il va agir comme un load balancer sur tous les pods. 
On pourrait essayer de joindre les pods par leur DNS mais les IP des POD  varient à chaque redémarrage

Un service headless va permettre fournir une entrée DNS afin de joindre chaque POD.
Il est créé comme un service normal mais ne possède pas d'IP et ne fait aucun load balancing.

Tout ce  qu'il fait est decréer uneentrée DNS pour chaq=cun des POD enutilisant les domaines et sous domaines

```yaml 
#Creation d'un headless service
apiVersion: v1
kind: Service
metadata:
    name: sql-h
spec:
    ports:
        - port: 3306
    selector:
        app: sql
    clusterIP: None #a presicer dans le cas d'un service headless
```

Pour qu'un DNS nommée soit attribué au POD, celui ci doit mentionner les propriétés suivantes: 

* subdomain doit correspondre au name du service headless
* hostmane doit etre mentionnée

```yaml 
#Creation d'un headless service
apiVersion: v1
kind: Pod
metadata:
    name: sql-pod
    labels:
        app: sql
spec:
    containers:
        - name: sql
          image: postgres
    subdomain: sql-h #nom du sous domaine
    hostname: sql-pod #nom du hostname
```

Dans le cas d'un deployment classique si le pod ne présente pas de hostname ou subdomaine alors ils ne sont pas ajoutés.
Si on les précise alors le deployment vadupplquer les pods avec toutes les propriétés et ilsauraont tous le meme nom. On aura alors un erreur DNS.

Si on utilise un StatefulSet au lieu d'un Déployment, alors on aura une distinction au niveau du nom du pod. Le StatefulSet assigne automatiquement le hostname de chque pod en se basant sur le nom du pod. Le subdomaine sera celui du service headless


```yaml 
#Creation d'un stateful set associé à un service headless
apiVersion: v1
kind: StetefulSet
metadata:
    name: sql-deployment
    labels:
        app: sql
spec:
    serervicName : sql-h #npm duservice headless
    replicas: 3
    matchLabels:
        app: mysql
    template:
        metadata:
          name: sql-pod
          labels: 
            app: sql
        spec:
            conainers:
            - name : sql
              image: postgres
```