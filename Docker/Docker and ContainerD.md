# Docker Runtimes

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
