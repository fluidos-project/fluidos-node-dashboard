# FluidosDashboard
This is a simple Dashboard for the Fluidos Project. You can view and interact with the main Fluidos Node Resources to emulate the purchasing of a resource from a provider.

### Usage
At the moment, the dashboard can be installed in a Kubernetes Cluster through the manifest `deploymentDashboard.yaml` in `/manifest`.

The Dashboard can also be executed locally on your machine (e.g. for development purposed). You must set the `kubeconfig` variable ( in `server/utils/utils.go`) which is used to specify the path of local configuration of Kubernetes-consumer-cluster.
Then the dashboard can be started with:
`go run main.go` for the server (in `/server`)
`npm run dev` for the frontend (in `/client`)