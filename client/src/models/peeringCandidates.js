export class PeeringCandidate {
    constructor(data) {
        this.apiVersion = data.apiVersion;
        this.kind = data.kind;
        this.metadata = {
            creationTimestamp: data.metadata.creationTimestamp,
            generation: data.metadata.generation,
            managedFields: data.metadata.managedFields,
            name: data.metadata.name,
            namespace: data.metadata.namespace,
            resourceVersion: data.metadata.resourceVersion,
            uid: data.metadata.uid
        };
        this.spec = {
            available: data.spec.available,
            flavor: {
                metadata: {
                    name: data.spec.flavor.metadata.name,
                    namespace: data.spec.flavor.metadata.namespace
                },
                spec: {
                    availability: data.spec.flavor.spec.availability,
                    flavorType: {
                        typeData: {
                            characteristics: {
                                architecture: data.spec.flavor.spec.flavorType.typeData.characteristics.architecture,
                                cpu: data.spec.flavor.spec.flavorType.typeData.characteristics.cpu,
                                gpu: {
                                    cores: data.spec.flavor.spec.flavorType.typeData.characteristics.gpu.cores,
                                    memory: data.spec.flavor.spec.flavorType.typeData.characteristics.gpu.memory,
                                    model: data.spec.flavor.spec.flavorType.typeData.characteristics.gpu.model
                                },
                                memory: data.spec.flavor.spec.flavorType.typeData.characteristics.memory,
                                pods: data.spec.flavor.spec.flavorType.typeData.characteristics.pods,
                                storage: data.spec.flavor.spec.flavorType.typeData.characteristics.storage
                            },
                            policies: {
                                partitionability: {
                                    cpuMin: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.cpuMin,
                                    cpuStep: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.cpuStep,
                                    gpuMin: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.gpuMin,
                                    gpuStep: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.gpuStep,
                                    memoryMin: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.memoryMin,
                                    memoryStep: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.memoryStep,
                                    podsMin: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.podsMin,
                                    podsStep: data.spec.flavor.spec.flavorType.typeData.policies.partitionability.podsStep
                                }
                            },
                            properties: data.spec.flavor.spec.flavorType.typeData.properties
                        },
                        typeIdentifier: data.spec.flavor.spec.flavorType.typeIdentifier
                    },
                    location: {
                        additionalNotes: data.spec.flavor.spec.location.additionalNotes,
                        city: data.spec.flavor.spec.location.city,
                        country: data.spec.flavor.spec.location.country,
                        latitude: data.spec.flavor.spec.location.latitude,
                        longitude: data.spec.flavor.spec.location.longitude
                    },
                    networkPropertyType: data.spec.flavor.spec.networkPropertyType,
                    owner: {
                        domain: data.spec.flavor.spec.owner.domain,
                        ip: data.spec.flavor.spec.owner.ip,
                        nodeID: data.spec.flavor.spec.owner.nodeID
                    },
                    price: {
                        amount: data.spec.flavor.spec.price.amount,
                        currency: data.spec.flavor.spec.price.currency,
                        period: data.spec.flavor.spec.price.period
                    },
                    providerID: data.spec.flavor.spec.providerID
                },
                status: {
                    creationTime: data.spec.flavor.status.creationTime,
                    expirationTime: data.spec.flavor.status.expirationTime,
                    lastUpdateTime: data.spec.flavor.status.lastUpdateTime
                }
            },
            solverID: data.spec.solverID
        };
        this.status = {
            creationTime: data.status.creationTime,
            lastUpdateTime: data.status.lastUpdateTime
        };
    }
}