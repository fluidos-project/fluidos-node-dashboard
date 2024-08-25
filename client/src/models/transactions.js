export class Transaction {
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

class Spec {
  constructor(data) {
    this.buyer = new Buyer(data.buyer);
    this.clusterID = data.clusterID || '';
    this.configuration = new Configuration(data.configuration);
    this.expirationTime = data.expirationTime || '';
    this.flavorID = data.flavorID || '';
  }
}

class Buyer {
  constructor(data) {
    this.domain = data.domain || '';
    this.ip = data.ip || '';
    this.liqoID = data.liqoID || '';
    this.nodeID = data.nodeID || '';
  }
}

class Configuration {
  constructor(data) {
    this.data = new ConfigurationData(data.data);
    this.type = data.type || '';
  }
}

class ConfigurationData {
  constructor(data) {
    this.cpu = data.cpu || '';
    this.memory = data.memory || '';
    this.pods = data.pods || '';
  }
}
