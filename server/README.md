# Server Fluidos Dashboard

Backend for the Dashboard.

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

### API 

- GET `api/flavors`: Retrieve all the flavors.
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: List of flavors available in the Fluidos Node.

- GET `api/flavors/{name}`: Retrieve a single flavor.
  - Request Parameters:
  - `name`: name (used as unique ID) of the flavor
  - Request Body Content: None
  - Response Body Content: Flavors with the specified name.

- GET `api/solvers`: Retrieve all the solver requests.
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: List of solvers created in the Node

- GET `api/discoveries`: Retrieve all the discoveries (candidates which matches the requirements specified in the solver request).
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: List of discoveries found in the Provider Nodes.

- GET `api/reservation`: Retrieve all the reservations.
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: 

- GET `api/contracts`: Retrieve all 
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: 

- GET `api/transactions`: Retrieve all .
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: 

- GET `api/peeringcandidates`: Retrieve all.
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: 

- GET `api/allocations`: Retrieve all the reservations.
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: 

- GET `api/nodes`: Retrieve info and metrics related to all the nodes of the clusters.
  - Request Parameters: None
  - Request Body Content: None
  - Response Body Content: 