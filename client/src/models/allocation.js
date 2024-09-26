export class Allocation {
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
    this.contract = new ContractReference(data.contract);
  }
}

class ContractReference {
  constructor(data) {
    this.name = data.name || '';
    this.namespace = data.namespace || '';
  }
}

class Status {
  constructor(data) {
    this.lastUpdateTime = data.lastUpdateTime || '';
    this.message = data.message || '';
    this.status = data.status || '';
  }
}
