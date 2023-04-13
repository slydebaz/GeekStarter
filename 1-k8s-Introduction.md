
# Kubernetes (K8s): Homme de barre

![K8s logo](k8s/k8s-logo.svg)

## Pourquoi le DevOps ?

L'approche à pour but de minimiser le time to market en rapprochant le dev des ops (ex sysAdmin).

## Rappel sur les notions liés aux containers

2 notions a retenir:

- *namespace*
  - ce qu'un processus voit
  - grouper et isoler des ressources
- *control groups (cgroups)*
  - limiter les ressources que le processus peut utiliser
 
Un container = processus qui peut etre executé de manière isolée

## Pourquoi un Orchestrateur ?

Docker est le socle de base des architectures microservices
Il faut donc une technologie  pour manipuler les containers, les changer, les deployer, revenir en arriere, fournir avoir une IHM pour monitorer la solution etc....

## Comment savoir si on en a besoin ?

*Server* x *Change Rate* = *Benefit of orchestration*

## Un Orchestrateur ca sert à quoi ?

- Gestion application executées dans des containeurs (deploiement, montée en charge, mise a jour)
- Reconciliation: redemarrage des services en echec
- gestion service stateless (pas de persistence de donnée), service stateful
- secret et configuration
- long running process et batch jobs
- RBAC Role Base Access Control

Il existe de nombreuses distributions de K8s qui viennent ajouter leurs features:
Amazon (ELK) ECS, Mesos, Marathon

Vendors products: Docker Enterprise, Openshift Redhat, Ubuntu K8S, VMware pks

## Kubernetes (K8s) c'est quoi ?

C'est un ensemble d'API containerisées permettant d'orchestrer le comportement de l'application.

# Références

[Cloud Native Computing Foundation](https://www.cncf.io/)

[Twelve Factors App](https://12factor.net/)

[K8s Partner](https://kubernetes.io/partners/#conformance)

Pour apprendre:

[katacoda](https://katacoda.com/)

[play-with-k8s.com](play-with-k8s.com)

[play-with-docker.com](play-with-docker.com)

# Les concepts

[K8s Documentation](https://kubernetes.io/docs/home/)

## Les types de noeuds

- Cluster = ensemble de nodes Linux ou Windows

- Master :
  - En charge du cluster
  - Garant de l'état du cluster
  - Une API existe pour la gestion du cluster
  - Ils représentent le *control plan* qui est l'ensemble des noeuds qui exposent l'API de K8s.
  - On s'adresse à eux pour gérer les node worker et donc les applications.

- Worker :
  - Utilisé pour executer des applications

Si un node *failed* alors vous avez toujours les autres

Le *master* va surveiller les *workers* et gérer le dispatch de la charge vers les noeud OK

Informations sur le cluster

```bash
kubectl cluster-info
kubectl get nodes
```

## POD

- Plus petite unité applicative dans K8s
- Groupe de containers qui partage du réseau et du stockage

Pour mettre à l'echelle une application, en général on met un container par POD mais il est possible d'avoir d'autres containers dans le pod (side car pattern qui viennent assister l'application).

En faisant partie du meme pod, ils peuvent également partager le meme network
Les containers d'un pod partagent le meme cycle de vie.
Pour voir l'utilité des pods, il faut imaginer avoir à gérer les relations et cycles de vie de plusieurs containers si on devait faire une mise à l'echelle "manuelle" sans rien pour orchestrer.

## Deployment

Gérer un ensemble de POD identiques : *replicas*
Utilisé pour mettre à jour les POD

## Service

Regroupement de POD similaires

- Définir de règles reseau pour accéder à ses POD et faire de la repartition de charge.
- Exposer des PODs pour les rendre accessibles à l'intérieur ou à l'exterieur du cluster.

**Important**: Pour pouvoir être accessible. Une application contenur dans un POD doit également être associé à un service qui va définir le routage réseau.

- Resources
- Workload => permet le déploiement des pods de maniere abstraite
- Network
- Configuration
- Stockage
- RBAC
- Etendre le cluster
  
# YAML

Dans un fichier de spécification yaml on va systémaqtiquement trouver les 4 sections suivantes:

- APIVersion
  - précise le groupe utilise dans l'API pour gérér la ressource
- Kind
  - type de ressource (POD / Service / Deployment ...)
- Metadata
  - Label & Annotation (clé /valeur)
    - Utilisé pour différentes tâches: Sélection d'objet / Contrainte de déploiement / Lister les ressources d'une app
  - Annotations
    - Ne sert pas à séléctionner des objets
    - Non interne à K8s
    - Utilisé par les appliations externes pour ajouter ou configurer des applications
- Spec
  - Contient tout le fonctionnel de la resource à déployer.
  - C'est ici qu'on va trouver des références aux containers.

# Gestion du cluster

*kubectl*: envoie des requetes à l'API serveur pour gérer le cluster (création ressource, deployment ....).

Chaque requête envoyée par kubectl passe par des étapes d'**authentification** ET d'**autorisation**

Config KubCtl:

```bash
${HOME}/.kube/config
$KUBECONFIG
~kubeconfig
```

## kubectx
KubeCtx est un outil permetant de définir plusieurs context et de switcher facilemetn de l'un a l'autre
https://github.com/ahmetb/kubectx

NB: on peut avoir les configs de plusieurs clusters dans un seul fichier de config kubectl

Un contexte est définit par deux choses:

1. Un nom de cluster
2. nom d'utilisateur

```bash
kubectl config view

context:
    cluster: minikube
    extensions:
    - extension:
        last-update: Mon, 28 Mar 2022 10:49:45 CEST
        provider: minikube.sigs.k8s.io
        version: v1.25.2
      name: context_info
    namespace: default
    user: minikube
  name: minikube
```

  => ici le namespace *default* est utilisé

```bash
kubectl version #versions du client Kubctl et du cluster
kubectl get nodes
kubectl get pods
kubectl get pods -n kube-system #liste les pods du cluster
```

## Installation de KubeCtl

[KubeCtl Installation](https://gitlab.com/lucj/k8s-exercices/-/blob/master/Installation/kubectl.md)

kubectl exec -ti pod-default -- sh

# Architecture / Vue d'ensemble

K8s est un cluster

## Node Master

### kube-apiserver 

- Expose l'api du cluster
- C'est le point d'entrée des rêquetes

### kube-scheduler 

- intervient pour créer un pod et selectionner le node sur lequel il devra etre déployé

### kube-controller-manager

- processus qui englobe plusieurs controlleurs qui sont en charge de surveiler l'etat des ressources et d'engager des actions correctives si une app ne tourne pas correctement

### etcd

- *distributed key/value store* qui stocke l'etat du cluster et son historique
- peut etre installé sur le master ET ASUSSI sur un container externe
- responsable de l'implmentation des logs au sein du cluster.
- S'assure qu'il n'y a pas de conflit au sein du master node

## Node Worker

### kube-proxy

- gère le réseau pour l'exposition des services du node vers l'exterieur

### kubelet

- Agent qui s'execute sur chaque noeud du cluster
- Communique avec le node master
- Assure que les containers d'un pod tournent conformement à la spécification
- Reboot en cas de crash.
- Communique avec l'API server du manager

### container-runtime

- environnement d'execution des container: docker, rkt, cri-o ..

K8s was built to orchestrate Docker in the beginning and not other vendors
=> K8s introduced Container Runtime Interface  to allow work wtih other vendors than Dockers

The condition is to be compliant with this Open Container Initiative : ImageSpec + RuntimeSpec
ImageSpec: How an image should be built
RuntimeSpec: How container runtime should be developped

=> Now, anyone can build a Container Runtime that work with K8s
Initially Docker was not built based on the CRI

K8s introduced DockerShim to keep supporting Docker 

ContainerD is CRI compatible

Since K8s 1.24 DockerShim was removed

ContainerD is now part of Docker.
It can be isntalled alone but is not really user friendly with the commandline : ctr

instead prefer use nerdctl, very similar to docker

Only for debug:
CriCtl can be used to connect to any compatible runtime

unix:///var/run/dockershim.sock.or
unix:///run/containerdd/containerd/sock or
unix://run/crio.sock
unix:///var/run/cri-dockerd-sock

crictl --runtime-endpoint
export CONTAINER_RUNTIME_ENDPOINT


# KubeCtl

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