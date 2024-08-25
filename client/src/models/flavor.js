//model of the Flavor Resource
export class Flavor {
    constructor(data) {
      this.apiVersion = data.apiVersion || '';
      this.kind = data.kind || '';
      this.metadata = new Metadata(data.metadata);
      this.spec = new Spec(data.spec);
    }
  }
  
  class Metadata {
    constructor(data) {
      this.creationTimestamp = data.creationTimestamp || '';
      this.generation = data.generation || 0;
      this.managedFields = (data.managedFields || []).map(field => new ManagedField(field));
      this.name = data.name || '';
      this.namespace = data.namespace || '';
      this.ownerReferences = (data.ownerReferences || []).map(ref => new OwnerReference(ref));
      this.resourceVersion = data.resourceVersion || '';
      this.uid = data.uid || '';
    }
  }
  
  
  class ManagedField {
    constructor(data) {
      this.apiVersion = data.apiVersion || '';
      this.fieldsType = data.fieldsType || '';
      this.fieldsV1 = data.fieldsV1 || {};
      this.manager = data.manager || '';
      this.operation = data.operation || '';
      this.time = data.time || '';
    }
  }
  
  class OwnerReference {
    constructor(data) {
      this.apiVersion = data.apiVersion || '';
      this.kind = data.kind || '';
      this.name = data.name || '';
      this.uid = data.uid || '';
    }
  }
  
  class Spec {
    constructor(data) {
      this.availability = data.availability || false;
      this.flavorType = new FlavorType(data.flavorType);
      this.location = new Location(data.location);
      this.networkPropertyType = data.networkPropertyType || '';
      this.owner = new Owner(data.owner);
      this.price = new Price(data.price);
      this.providerID = data.providerID || '';
    }
  }
  
  class FlavorType {
    constructor(data) {
      this.typeData = new TypeData(data.typeData);
      this.typeIdentifier = data.typeIdentifier || '';
    }
  }
  
  class TypeData {
    constructor(data) {
      this.characteristics = new Characteristics(data.characteristics);
      this.policies = new Policies(data.policies);
      this.properties = data.properties || {};
    }
  }
  
  class Characteristics {
    constructor(data) {
      this.architecture = data.architecture || '';
      this.cpu = data.cpu || '';
      this.gpu = new GPU(data.gpu);
      this.memory = data.memory || '';
      this.pods = data.pods || '';
      this.storage = data.storage || '';
    }
  }
  
  class GPU {
    constructor(data) {
      this.cores = data.cores || '';
      this.memory = data.memory || '';
      this.model = data.model || '';
    }
  }
  
  class Policies {
    constructor(data) {
      this.partitionability = new Partitionability(data.partitionability);
    }
  }
  
  class Partitionability {
    constructor(data) {
      this.cpuMin = data.cpuMin || '';
      this.cpuStep = data.cpuStep || '';
      this.gpuMin = data.gpuMin || '';
      this.gpuStep = data.gpuStep || '';
      this.memoryMin = data.memoryMin || '';
      this.memoryStep = data.memoryStep || '';
      this.podsMin = data.podsMin || '';
      this.podsStep = data.podsStep || '';
    }
  }
  
  class Location {
    constructor(data) {
      this.additionalNotes = data.additionalNotes || '';
      this.city = data.city || '';
      this.country = data.country || '';
      this.latitude = data.latitude || '';
      this.longitude = data.longitude || '';
    }
  }
  
  class Owner {
    constructor(data) {
      this.domain = data.domain || '';
      this.ip = data.ip || '';
      this.nodeID = data.nodeID || '';
    }
  }
  
  class Price {
    constructor(data) {
      this.amount = data.amount || '';
      this.currency = data.currency || '';
      this.period = data.period || '';
    }
  }
  

  