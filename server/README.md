# Server Fluidos Dashboard

Backend for the Dashboard is handled.

### Information
The Backend is a Webserver in Go used to retrieve information of the Custom Resources deployed inside a Fluidos Node.
The main resources are:
- Flavor
- Solver
- Peering Candidates
- Contracts
- Transaction
- Allocation


### Usage
The `kubeconfig` variable ( in `utils.go`) is used to specify the local configuration of Kubernetes when the Dashboard is not running inside the cluster (e.g. for development purposed).