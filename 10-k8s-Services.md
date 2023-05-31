![K8s logo](k8s/k8s-logo.svg)

# Services

Permet la communication entre les composant à l'intérieur et à l'exterieur du cluster

Chaque service a sa propre @IP interne au cluster qui est resolu au niveau DNS à partir du nom du service

*Permet de diminiuer le couplage entre les pods
*Permet de regrouper des pods qui ont la meme specification
*Endpoint reseau pour connecter un pod ou a groupe de pod à un autre
*Load balancing: Lorsqu'une requete arrive sur l'@IP virutelle associée au service, elle sera redirrigée sur l'un des pods gérés par ce service. Kube-Proxy met en place les règles de repartition de charge

## Fonctionnement

Rappel: Un node possède une IP. Sur ce node il y a un ou plusieurs sous ensembles de pods qui ont aussi leur IP.
Il n'y a aucun lien entre l'adresse IP du node et celles des pods.
Un service va permettre de faire le lien avec d'autres pods à l'intérieur ou à l'exterieur du cluster.

Sans service on devrait passer par du SSH pour accéder à l'application.

CoreDNS va permettre de resoudre les services par nom

Le label dans la balise selector du service iront matcher avec les pods qui ont le label identiques

```yaml
kind: Service
apiVersion: v1
metadata:
  name:  myapp-service
spec:
  type:  LoadBalancer | ClusterIP | NodePort
  ports:
  - name:  myapp-port
    port:  80
    targetPort:  8080   <= port du service 
    nodePort: 30008     <= port exposé au node, faclutatif mais is non precise alors premier du range 
  selector:
    app: myapp
    type: front-end
```

```yaml
kind: Service
apiVersion: v1
metadata:
  name:  myapp-service
spec:
  type:  LoadBalancer | ClusterIP | NodePort
  ports:
  - name:  myapp-port
    port:  80
    targetPort:  8080   <= port du service 
    nodePort: 30008     <= port exposé au node, faclutatif mais is non precise alors premier du range 
  selector:
    app: myapp
    type: front-end
```

Différents types de services:

### ClusterIP

exposer un ensemble de pod simplement l'intérieur du cluster

    L'application qui tourne dans les pods pourra etre consommée par d'autres pods du cluster
    On ne peut donc pas acceder à un pod depuis l'exterieur mais on a tout a fait le droit de le faire depusi un autre pod
    Pour acceder a un service du cluster on peut passer par :
        * port forward
        * proxy K8s
    N.B forward et proxy n'ont pas vocation a persister
    selector:
        app: vote => indique les Pods que le service va exposer (ceux avec le label: vote)
    type: ClusterIP
    ports:
    -	port:80 			=> port exposé par le service
        targetPort: 80		=> port sur lequel seront forwardées les requetes sur les pods qu'il regroupe. Si pas mentionné, ce sera le meme que Port

        nodePort: 300000 -> 32767 => port exposé publiquement pour les services de type nodePort. si pas mentionné alors un port au hasard est choisi
    
    


### NodePort

exposer les Pods a l'exterieur du cluster mais aussi à l'intérieur car c'est aussi un ClusterIP
    On définit un port sur chacune des machines du cluster pour avoir accès à ce service depuis l'exterieur
    30 000 <> 32 767 modifiable dans la config de l'API serveur
    Important: c'est le meme port sur chaque node du cluster
    
    type: ClusterIP
    ports:
    -	port:80 			
        targetPort: 80		
        nodePort: 31000 => port du du service expose par chaque node
	
	
	
### LoadBalancer

uniquement si le cluster est utilisé chez un Cloud Provider 
    Un service nodePort en front de l'infra erxpose une port définit entre  30 000 <> 32 767.
    Pour éviter à l'utilisateur d'avoir a se souvenir du port associer il faudrait déployer un proxy pour mapper le port 80 au port du service.
    
    Utiliser un service de type loadbanlancer évite d'avoir a faire cela et dit au provider de le faire pour nous

    Identique a un nodePort mais ajoute en plus un loadbalancer avec son @IP en front du service comme element d'infrastructure
    On s'en sert en général quand on a deployé chez un cloud provider

    Il cré un NodePort+ClusterIP and parle dit au LoadBalancer de votre infra de parler au NodePort
    
    type: LoadBalancer
    ports:
    -	port:80 			
        targetPort: 80
	
	
	*ExternalName: permet d'établir un mapping avec un nom DNS

N.B: 
La creation d'un NodePort entraine la creation d'un ClusterIP
LA creation d'un LB entraine la creation d'un ClusterIP + NodePort

Pour lier un srvice a un pod , le port ne suffit pas car plusieurs de vos application peuvent avoir le meme port exposé.
Il faut donc utiliser les labels et ajouter une section selector dans la spec du service qui va reprendre les labels du pod


selector:
			app: vote 			=> indique les Pods que le service va exposer (ceux avec le label: vote)



Important: la creation d'un service est transverse aux noeuds du cluster.
Aisni on peut acceder à l'application derriere le service depuis les différents noeud et le port du service: <node_ip><service_port>

Single pod sur un single noeud
Multiple pods sur un seul noeud
Multiple pods sur plusieurs noeuds 