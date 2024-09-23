# FLUIDOS Node Dashboard
This project implements a simple dashboard for the [FLUIDOS](https://www.fluidos.eu/) project, in particular with respect to the capability to _acquire_ and _reserve_ resources throught the [REAR](https://github.com/fluidos-project/REAR) protocol.
This allows a FLUIDOS node to extend its _capabilities_, _resources_ and _services_ with the ones available in a remote node, hence creating the computing continuum proposed in FLUIDOS.

This dashboard simplifies how you interact with the most important resources defined in the FLUIDOS node, which can be used to visualize, reserve and buy resources from a remote FLUIDOS node through a GUI instead of using the Kubernetes Custom Resources underneath.

## Usage
The dashboard can be installed in a Kubernetes cluster through the manifests in `/manifest`. You need to deploy the Deployment, the Services and the Ingress.
In addition, remember to install the [Ingress Controller](https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.2/deploy/static/provider/cloud/deploy.yaml).

The Dashboard can also be executed locally on your machine (at [localhost:8080](http://localhost:8080/)) through the command:
```bash
kubectl port-forward --namespace ingress-nginx service/ingress-nginx-controller 8080:80
```
