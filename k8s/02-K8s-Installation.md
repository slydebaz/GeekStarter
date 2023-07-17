![K8s logo](k8s/k8s-logo.svg)

# Installation

Plusieurs façons d'utiliser K8s:

- cluster local
- cluster de production

## cluster local

### MiniKube 

https://github.com/kubernetes/minikube

https://minikube.sigs.k8s.io/docs/start/

=> besoin d'un hyperviseur
=>        binaire minikube
=>      binaire kubectl
=> execute une VM sur lequel s'execute l'ensemble des processus de K8s
=> ca donne un cluster K8s avec un seul node  . PAs un environnement de production

curl -Lo minikube <https://storage.googleapis.com/minikube/latest/12740/minikube-linux-386>

N.B: Par defaut le driver c'est Hyper-V, il es t possible de le changer par Virtualbox.
si ca merde toujorsu apres une minkube start alors faire un ::
minikube delete
minikube start --no-vtx-check
minikube start --no-vtx-check --cpus 4 --memory 8192
./VBoxManage.exe modifyvm "minikube" --cpus 2 --memory 8192

### Docker Desktop (Mac/Windows) 

https://hub.docker.com/editions/community/docker-ce-desktop-windows

https://hub.docker.com/editions/community/docker-ce-desktop-mac

=> anciennement Docker For Mac / Windows (fin 2018)
=> choix de l'orchestrateur Swarm / Kubernetes

Activation wsl(WSL, Windows System for Linux)

https://docs.microsoft.com/fr-fr/windows/wsl/

https://docs.microsoft.com/fr-fr/windows/wsl

```bash
install-manual #step-4---download-the-linux-kernel-update-package>
wsl -l -v
```

### Kind Kubernetes in Docker  

https://github.com/kubernetes-sigs/kind

- besoin de l'Api docker
- Autre solution qui permet de lancer un ccuster en local
- permet de créer une cluster avec un ou plusieurs nodes (avec fichier de configuration). Chaque Node s'execute dans un container

### MicroK8s 

https://microk8s.io/docs/getting-started

https://microk8s.io/docs/install-alternatives

- Execute un cluster composé d'un seul ou plusieurs nodes
- très lights, fonctionne avec addon
- pas mal pour les developpeurs, intragration continue, IoT
- utilisation avec Multipass

### K3s

https://k3s.io/

- convient très bien pour IoT et edgecomputing
- issue de Rancher

### Mutlipass

- permet de créer un cluster sur plusieurs de VM facilement
- Compatible avec plusieurs hyperviseurs

## Cluster de production

Cluster Manage => gestion par un tiers

Google: GKS (K8s) / AKS (docker) / DigitalOcean ...

### Cluster de production en local

### kudeadm

https://kubernetes.io/docs/reference/setup-tools/kubeadm/ General Abilitity fin 2018

- Il faut au prealable que les nodes soient provisionnés
- Le node pourra etre initialisé sur ce cluster
- installation sur chaque machine que l'on souhaite provisionner
- depsuis le node master on lance le kube init
- mise en place du reseau kubectl apply
- revient a deployer des agent sur chaque machine
=> Kubeadm join pour rejoindre le reseau
=> procedure apres provisionnement des ressources

## Rappel sur Installation de Docker

```bash
sudo apt-get update
curl -sSL https://get.docker.com | sh
```

- Ajout de la clé pour l'authentification des packages provenant de google

```bash
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add
```

- Ajout des sources pour la récup de packages

```bash
sudo apt-add-repository "deb http://apt.kubernetes.io/ kubernetes-xenial main"
/etc/apt/sources.list.d/kubernetes.list
```

- Installation de kubelet et kubeadm

```bash
sudo apt-get install kubeadm kubelet kubectl -y
```

- Sur la machine local Récupérer un fichier de config d'un des nodes pour configurer le contexte de kubectl 

```bash
scp master@IP-Master:/etc/Kubernetes/admin.conf admin-k8s.conf
export KUBECONFIG=$PWD/admin-k8s.conf
```

kubectl get nodes <= les nodes devraient être en Status = NOTREADY car manque AddOn pour la gestion du reseau

```bash
#Weave.works kube-add-on
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```

## Outils

### kops

permet la gestion complete du cycle de vie d'un cluster

### kubespray

utilise ansible pour la mise en place de K8s avec un inventory

### rancher

pas mal car IHM Web pour la supervision, deploiement de plusieurs cluster et des application viaz un catalogue

### pharos

mise en place cluster sur infra existente

### docker EE 

### Terraform + Ansible
