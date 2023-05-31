
![K8s logo](k8s/k8s-logo.svg)

# Namespaces

PErmet l'isolation des ressources.

C'est assez pratique lorsque l'on dispose d'un cluster qui heberge différents environnements (dev, stage, prod)

todo: schema 3.24 4.45

Pour définir des limites de ressources d'un namespace, vous pouvez créer un ResourceQuota

```bash 
#Suppression de ressources
kubectl create -f <spec_file>.yaml --namespace=<namespace>
```

Sinon vous pouvez ajouter une key/value namespace: <namespace> dans la section metadata


```bash 
#Lister les pods d'un namespace
kubectl get pods --namespace=<namespace>
```

```bash 
#Lister les pods de tous les namespaces
kubectl get pods --all-namespaces
```

```bash 
#Définir un namespace par défaut
kubectl config set-context $(kubectl config current-context) --namespace-dev
```



