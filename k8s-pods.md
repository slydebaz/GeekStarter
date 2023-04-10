# POD
Plus petite unité applicative dans kubernetes
groupe de containers qui partage la meme stack reseau (via localhost) / staockage (via volumes)
chaque pod a une @IP dedies
           se base sur uen specification (Yaml) qui définit les containeers qui tourneront dans le pod
on peut voir un pod comme un applicatif métier d'uen application

## Cycle de vie 
-lancement

```bash
kubectl create -f <pod_specification>.yaml
kubectl apply -f wordpress_pod.yml #exemple
kubectl run <pod_name> --image=<image_name>
```

## suppression 

```bash
kubectl delete pod <pod_name>
```

## liste des pods (par defautl seulement les namespace default)

```bash
kubectl get pod
```

## Editer la spec
```bash
kubectl edit pod <pod_name>
```

## Afficher la spec
```bash
kubectl run redis --image<image_name> --dry-run!client -o yaml
```

## Description d'un pod

```bash
kubctl describe pod <pod_name>
kubctl describe po/<pod_name>
```

## logs

```bash
kubectl logs <pod_name> [-c <container_name>]
```

Si il y a plusieurs replicas, la commande logs choisira arbitrairement un pod

```bash
kubectl logs <pod_name> [-c <container_name>] --follow --tail 1
```

N.B la commande , combinée aux labels permet d'afficher les logs de plusieurs pods.

## shell interactive

```bash
kubectl exec <pod_name> -t -i [-c  <container_name>] -- command
kubectl exec -ti www-594bc6dfc7-k48kh -- sh #exemple
```


## forward de port (publier un port sur la machine hote)

```bash
kubectl port-forward <pod_name> <host_port>:<container_port>
```




## Container pause => garant des namespaces



N.B chaque pod communique via son @IP


1 Volume est lié au cycle de vie du POD et non du container => Si le Container tombe , il n'entrain pas avec lui le volume
