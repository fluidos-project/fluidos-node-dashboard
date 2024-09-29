# Client Fluidos Dashboard

This is a React frontend to interact with the Fluidos Node Resources.

### Pages and routing
The Routing of the app is organized in the following way:
- `/`: [NodeInfoPage](/client/src/pages/Nodes/NodeInfoPage.jsx) component. It shows the Remote Fluidos Nodes and the main metrics of every Kubernetes node in the cluster.

- `/flavors`: [FlavorsPage](/client/src/pages/Flavor/FlavourPage.jsx) component. It shows the Flavor resource the provider make available to sell.
- `/flavors/:name`: [SingleFlavorPage](/client/src/pages/Flavor/SingleFlavorPage.jsx) component. It shows the Flavor resource with the specified `name`.
- `/flavors/new`: [CreateFlavorPage](/client/src/pages/Flavor/CreateFlavorPage.jsx) component. It allows to create a new Flavor Resource inside the Fluidos Node.

- `/flavors/acquired`: [RemoteFlavorPage](/client/src/pages/Flavor/AcquiredFlavorPage.jsx) component. It shows the Flavor resources correctly bought. 
- `/flavors/acquired:name`: [SingleRemoteFlavorPage](/client/src/pages/Flavor/SingleAcquiredFlavorPage.jsx) component. It shows the Flavor resource with the specified `name`.

- `/flavors/available`: [AvailableFlavorPage](/client/src/pages/Flavor/AvailableFlavorPage.jsx) component. It shows all the Flavor resources available in the providers. This Flavors are internally called Peering Candidates.
- `/flavors/available/:name`: [SinglePeeringCandidatePage](/client/src/pages/PeeringCandidates/SinglePeeringCandidatePage.jsx) component. It shows the Peering Candidate resource with the specified `name`.

- `/solvers`: [SolverPage](/client/src/pages/Solver/SolverPage.jsx) component. It shows all the Solver Requests created in the Fluidos Node.
- `/solvers/:name`: [SingleSolverPage](/client/src/pages/Solver/SingleSolverPage.jsx) component. It shows the single Solver Request with the specified `name`.
- `/solvers/new`: [CreateSolverRequestPage](/client/src/pages/Solver/CreateSolverRequestPage.jsx) component. It allows to create a new Solver Request for the providers.

- `/reservations`: [ReservationPage](/client/src/pages/Reservation/ReservationPage.jsx) component. It shows all the Reservation resources created.
- `/reservations/:name`: [SingleReservationPage](/client/src/pages/Reservation/SingleReservationPage.jsx) component. It shows the Reservation resource with the specified `name`.
- `/reservations/new`: [CreateReservationPage](/client/src/pages/Reservation/CreateReservationPage.jsx) component. It allows to reserve a Flavor Resource (Peering Candidate).

- `/contracts`: [ContractPage](/client/src/pages/Contracts/ContractPage.jsx) component. It shows all the Contract resources created.
- `/contracts/:name`: [SingleContractPage](/client/src/pages/Contracts/SingleContractPage.jsx) component. It shows the Contract resource with the specified `name`.

- `/transactions`: [TransactionPage](/client/src/pages/Transaction/TransactionPage.jsx) component. It shows all the Transaction resources created.
- `/transactions/:name`: [SingleTransactionPage](/client/src/pages/Transaction/SingleTransactionPage.jsx) component. It shows the Transaction resource with the specified `name`.

- `/allocations`: [AllocationPage](/client/src/pages/Allocations/AllocationPage.jsx) component. It shows all the Allocation resources created.
- `/allocations/:name`: [SingleAllocationPage](/client/src/pages/Allocations/SingleAllocationPage.jsx) component. It shows the Allocation resource with the specified `name`.
- `/allocations/new`: [CreateAllocationPage](/client/src/pages/Allocations/CreateAllocationPage.jsx) component. It allows to create a new Allocation to start the purchased resource.

-  `/*`: [NotFoundPage](/client/src/pages/utils/NotFoundPage.jsx) component. It is used to inform the user that the requested page is missing.

### Future Updates
- Adding support for others FlavorType such as VM, Sensor, Service. At the moment only K8Slice is supported.