export class Reservation {
  constructor(data) {
    this.apiVersion = data.apiVersion || '';
    this.kind = data.kind || '';
    this.metadata = new Metadata(data.metadata);
    this.spec = new Spec(data.spec);
    this.status = new Status(data.status);
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
    this.subresource = data.subresource || '';
    this.time = data.time || '';
  }
}

class Spec {
  constructor(data) {
    this.buyer = new Buyer(data.buyer);
    this.configuration = new Configuration(data.configuration);
    this.peeringCandidate = new PeeringCandidate(data.peeringCandidate);
    this.purchase = data.purchase || false;
    this.reserve = data.reserve || false;
    this.seller = new Seller(data.seller);
    this.solverID = data.solverID || '';
  }
}

class Buyer {
  constructor(data) {
    this.domain = data.domain || '';
    this.ip = data.ip || '';
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

class PeeringCandidate {
  constructor(data) {
    this.name = data.name || '';
    this.namespace = data.namespace || '';
  }
}

class Seller {
  constructor(data) {
    this.domain = data.domain || '';
    this.ip = data.ip || '';
    this.nodeID = data.nodeID || '';
  }
}

class Status {
  constructor(data) {
    this.contract = new ContractReference(data.contract);
    this.phase = new Phase(data.phase);
    this.purchasePhase = data.purchasePhase || '';
    this.reservePhase = data.reservePhase || '';
    this.transactionID = data.transactionID || '';
  }
}

class ContractReference {
  constructor(data) {
    this.name = data.name || '';
    this.namespace = data.namespace || '';
  }
}

class Phase {
  constructor(data) {
    this.lastChangeTime = data.lastChangeTime || '';
    this.message = data.message || '';
    this.phase = data.phase || '';
    this.startTime = data.startTime || '';
  }
}
