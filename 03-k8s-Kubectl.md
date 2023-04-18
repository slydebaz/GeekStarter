
![K8s logo](k8s/k8s-logo.svg)

# KubeCtl

C'est le client qui permet de manipuler les Api K8s. Il convertit les ressources YAML en Json et envoi le tout au Serveur API sur le noeud master (le control plan)

2 approches : *spec* et *impérative*

- Dev: Impérative
- Prod: Déclaratif

Tips: AutoCompletion

```bash
sudo apt-get install bash-autocompletion
source <(kubectl completion bash)
```

## Utiliser la Documentation

```bash
kubectl api-resources #voir tout ce qu'il y a dans le cluster dans un namespace ou global
kubectl explain # obtenir la description de ce qu'il doit etre contenu dans la commande
```

On peut descendre dans l'arborescence d'une specification

```bash
kubectl explain services --recursive
kubectl explain service.spec
kubectl explain service.spec.type
kubectl explain deployment.spec.template.spec.volumes.nfs.server
```

Tips: utilisation de '---' pour separer les objets dans un fichier yaml

metadata: seulement name est obligatoire

la doc: https://kubernetes.io/fr/docs/reference/kubectl/jsonpath

```bash
#Accéder à la spec au format json
kubectl get deploy/www -o jsonpath='{.spec.template.spec.containers[0].image}'
```

```bash
#Affichage personnalisé
kubectl get pods -o custom-colums='NAME:metada.name, IMAGES:spec.containers[*].image' => affichage custom
```

## Lister les ressources

```bash
kubectl get all #recupere la liste des objets
```

```bash
#Lister les pods
kubectl get pods
kubectl get po/www -o yaml
kubectl describe po/www
```

## Supprimer des ressources

```bash 
#Suppression de ressources
kubectl delete --all pods --namespace=foo
kubectl delete --all pods --namespace=default
kubectl delete --all deployments --namespace=default
kubectl delete --all services --namespace=default
```

## Appliquer une spec

```bash
kubectl apply -f <yaml_file>  #create/update resources in a file
kubectl apply -f <yaml_folder> #create/update a chwole directory of yaml
kubectl apply -f <yaml_url> #create/update from a url
```

## Ouvrir un shell sur un container

```bash
#Ouverture shell interactif dans un pod
kubectl exec -ti <pod_name> --container <container_name> --bash 
kubectl exec -ti <pod_name> --container <container_name> --sh
```

- kubectl proxy => permet d'ouvrir une connexion entre la machine locale et l'api server. afin d'accéder à des workloads qui sont déployes sur le cluster mais par forcement exposés à l'exterieur
  
### kubectl aliases

https://github.com/ahmetb/kubectl-aliases

plugins => étendre les fonctionnalites de kubectl
fichier executable dans le PATH qui commence par kubectl

```bash
#Investigations
kubectl get componentstatus
kubectl get po --namespace=kube-system
kubectl get po --namespace=default
```

```bash
# output format
kubectl create namespace test-123 --dry-run -o json
kubectl create namespace test-123 --dry-run -o yaml
kubectl get pods -o wide
```

```bash
# ex
kubectl create namespace test-123 --dry-run -o json
kubectl create namespace test-123 --dry-run -o yaml
kubectl get pods -o wide
```

N.B Si vous souhaiter vérifier la specification générée par une commande mais snas la créer pour de vrai, alors vous pouvez utiliser l'option --dry-run=client