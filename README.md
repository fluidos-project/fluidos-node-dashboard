# FLUIDOS Node Dashboard
This project implements a simple dashboard for the [FLUIDOS](https://www.fluidos.eu/) project, in particular with respect to the capability to _acquire_ and _reserve_ resources throught the [REAR](https://github.com/fluidos-project/REAR) protocol.
This allows a FLUIDOS node to extend its _capabilities_, _resources_ and _services_ with the ones available in a remote node, hence creating the computing continuum proposed in FLUIDOS.

This dashboard simplifies how you interact with the most important resources defined in the FLUIDOS node, which can be used to visualize, reserve and buy resources from a remote FLUIDOS node through a GUI instead of using the Kubernetes Custom Resources underneath.

## Usage
The dashboard can be installed in a Kubernetes cluster through the manifest `deploymentDashboard.yaml` in `/manifest`.

The Dashboard can also be executed locally on your machine (e.g. for development purposed). You must set the `kubeconfig` variable ( in `server/utils/utils.go`) which is used to specify the path of local configuration of Kubernetes-consumer-cluster.
Then the dashboard can be started with:
`go run main.go` for the server (in `/server`)
`npm run dev` for the frontend (in `/client`)
