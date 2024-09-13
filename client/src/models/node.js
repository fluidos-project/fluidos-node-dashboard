
export class NodeInfo {
    constructor(json) {
        this.apiVersion = json.apiVersion || '';
        this.kind = json.kind || '';
        this.metadata = new Metadata(json.metadata);
        this.spec = new Spec(json.spec);
        this.status = new Status(json.status);
    }
}

class Status {
    constructor(data) {
        this.addresses = data.addresses.map((addr) => ({
            address: addr.address,
            type: addr.type,
        }));

        this.allocatable = {
            cpu: data.allocatable.cpu,
            memory: data.allocatable.memory,
            ephemeralStorage: data.allocatable["ephemeral-storage"],
            hugepages2Mi: data.allocatable["hugepages-2Mi"],
            pods: data.allocatable.pods,
        };

        this.capacity = {
            cpu: data.capacity.cpu,
            memory: data.capacity.memory,
            ephemeralStorage: data.capacity["ephemeral-storage"],
            hugepages2Mi: data.capacity["hugepages-2Mi"],
            pods: data.capacity.pods,
        };

        this.nodeInfo = {
            architecture: data.nodeInfo.architecture,
            bootID: data.nodeInfo.bootID,
            containerRuntimeVersion: data.nodeInfo.containerRuntimeVersion,
            kernelVersion: data.nodeInfo.kernelVersion,
            kubeProxyVersion: data.nodeInfo.kubeProxyVersion,
            kubeletVersion: data.nodeInfo.kubeletVersion,
            machineID: data.nodeInfo.machineID,
            operatingSystem: data.nodeInfo.operatingSystem,
            osImage: data.nodeInfo.osImage,
            systemUUID: data.nodeInfo.systemUUID,
        };

    }
}

class Metadata {
    constructor(data) {
        this.creationTimestamp = data.creationTimestamp;
        this.name = data.name;
        this.labels = new KubernetesNodeLabels(data.labels)
    }
}

class KubernetesNodeLabels {
    constructor(data) {
      this.architectureBeta = data["beta.kubernetes.io/arch"] || null;
      this.osBeta = data["beta.kubernetes.io/os"] || null;
      this.architecture = data["kubernetes.io/arch"] || null;
      this.hostname = data["kubernetes.io/hostname"] || null;
      this.os = data["kubernetes.io/os"] || null;
      
    }
}

class Spec {
    constructor(data) {
        this.podCIDR = data.podCIDR;
        this.podCIDRs = Array.isArray(data.podCIDRs) ? [...data.podCIDRs] : [];
        this.providerID = data.providerID;
        this.taints = Array.isArray(data.taints) ? data.taints.map(t => ({ ...t })) : [];
    }
}

export class NodeMetric{
    constructor(data) {
        this.apiVersion = data.apiVersion || '';
        this.kind = data.kind || '';
        this.metadata = new Metadata(data.metadata || {});
        this.timestamp = data.timestamp || '';
        this.usage = new Usage(data.usage || {});
        this.window = data.window || '';
    }
}

class Usage {
    constructor(data) {
      this.cpu = data.cpu || null;
      this.memory = data.memory || null;
    }
}