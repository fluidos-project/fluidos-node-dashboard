export class Solver {
    constructor(json) {
        this.apiVersion = json.apiVersion;
        this.kind = json.kind;
        this.metadata = {
            name: json.metadata.name,
            namespace: json.metadata.namespace,
            annotations: json.metadata.annotations || {},
            creationTimestamp: json.metadata.creationTimestamp,
            generation: json.metadata.generation,
            managedFields: json.metadata.managedFields || [],
            resourceVersion: json.metadata.resourceVersion,
            uid: json.metadata.uid
        };
        this.spec = {
            intentID: json.spec.intentID,
            findCandidate: json.spec.findCandidate,
            reserveAndBuy: json.spec.reserveAndBuy,
            establishPeering: json.spec.establishPeering,
            selector: {
                flavorType: json.spec.selector.flavorType,
                filters: {
                    architectureFilter: {
                        name: json.spec.selector.filters.architectureFilter.name,
                        data: json.spec.selector.filters.architectureFilter.data
                    },
                    cpuFilter: {
                        name: json.spec.selector.filters.cpuFilter.name,
                        data: json.spec.selector.filters.cpuFilter.data
                    },
                    memoryFilter: {
                        name: json.spec.selector.filters.memoryFilter.name,
                        data: json.spec.selector.filters.memoryFilter.data
                    },
                    podsFilter: {
                        name: json.spec.selector.filters.podsFilter.name,
                        data: json.spec.selector.filters.podsFilter.data
                    }
                }
            }
        };
        this.status = {
            findCandidate: json.status.findCandidate,
            reserveAndBuy: json.status.reserveAndBuy,
            peering: json.status.peering,
            discoveryPhase: json.status.discoveryPhase,
            reservationPhase: json.status.reservationPhase,
            solverPhase: {
                phase: json.status.solverPhase.phase,
                message: json.status.solverPhase.message,
                endTime: json.status.solverPhase.endTime,
                lastChangeTime: json.status.solverPhase.lastChangeTime
            },
            allocation: {
                name: json.status.allocation.name,
                namespace: json.status.allocation.namespace
            },
            contract: {
                name: json.status.contract.name,
                namespace: json.status.contract.namespace
            },
            credentials: {
                clusterID: json.status.credentials.clusterID,
                clusterName: json.status.credentials.clusterName,
                endpoint: json.status.credentials.endpoint,
                token: json.status.credentials.token
            }
        };
    }
}