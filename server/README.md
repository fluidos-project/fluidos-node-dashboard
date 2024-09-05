# Server Fluidos Dashboard

Backend for the Dashboard.

### Information
The Backend is a Webserver in Go used to retrieve information of the Custom Resources deployed in a Fluidos Node.
The main resources are:
- Flavor
- Solver
- Peering Candidates
- Contracts
- Transaction
- Allocation

### API 

- GET `api/flavors`: Retrieves all the Flavor Resources that I (as provider) make available for the sale
- GET `api/flavors/{name}`: Retrieves a Flavor with a specific name.
- POST `api/solvers`: Creates a new Solver Requests in the Node.

- GET `api/solvers`: Retrieves the list of Solver Requests created in the Node.
- GET `api/solver/{name}`: Retrieves a Solver request with a specific name.

- GET `api/peeringcandidates`: Retrieves all the candidates (Peering Candidates resource) found in the providers.
- GET `api/peeringcandidates/{name}`: Retrieves a candidate with a specific name.

- GET `api/reservation`: Retrieves all the Reservation resources.
- GET `api/reservation/{name}`: Retrieves a Reservation resource with a specific name.
- POST `api/reservation`: Creates a new Reservation resource.

- GET `api/contracts`: Retrieves all the Contract resource.
- GET `api/contracts/{name}`: Retrieves a Contract with a specific name.

- GET `api/transactions`: Retrieves all the Transaction resources.
- GET `api/transactions/{name}`: Retrieves a Transaction with a specific name.

- GET `api/allocations`: Retrieves all the Allocation resources.
- GET `api/allocations/{name}`: Retrieves a Allocation with a specific name.
- POST `api/allocations`: Creates a new Allocation.

- GET `api/nodes`: Retrieves info about nodes (local and remote with Liqo) in the cluster.

- GET `api/metrics`: Retrieves metrics associated with all nodes in the cluster.

- GET `/api/configmaps/{name}`: Retrieves info associated with a specific ConfigMap.
