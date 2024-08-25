export class Solver {
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
    this.annotations = data.annotations || {};
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
    this.establishPeering = data.establishPeering || false;
    this.findCandidate = data.findCandidate || false;
    this.intentID = data.intentID || '';
    this.reserveAndBuy = data.reserveAndBuy || false;
    this.selector = new Selector(data.selector);
  }
}

class Selector {
  constructor(data) {
    this.filters = new Filters(data.filters);
    this.flavorType = data.flavorType || '';
  }
}

class Filters {
  constructor(data) {
    this.architectureFilter = new Filter(data.architectureFilter);
    this.cpuFilter = new Filter(data.cpuFilter);
    this.memoryFilter = new Filter(data.memoryFilter);
    this.podsFilter = new Filter(data.podsFilter);
  }
}

class Filter {
  constructor(data) {
    this.data = new FilterData(data.data);
    this.name = data.name || '';
  }
}

class FilterData {
  constructor(data) {
    this.value = data.value || '';
    this.min = data.min || '';
    this.max = data.max || '';
  }
}

class Status {
  constructor(data) {
    this.allocation = new ResourceRef(data.allocation);
    this.contract = new ResourceRef(data.contract);
    this.credentials = new Credentials(data.credentials);
    this.discoveryPhase = data.discoveryPhase || '';
    this.findCandidate = data.findCandidate || '';
    this.peering = data.peering || '';
    this.reservationPhase = data.reservationPhase || '';
    this.reserveAndBuy = data.reserveAndBuy || '';
    this.solverPhase = new SolverPhase(data.solverPhase);
  }
}

class ResourceRef {
  constructor(data) {
    this.name = data.name || '';
    this.namespace = data.namespace || '';
  }
}

class Credentials {
  constructor(data) {
    this.clusterID = data.clusterID || '';
    this.clusterName = data.clusterName || '';
    this.endpoint = data.endpoint || '';
    this.token = data.token || '';
  }
}

class SolverPhase {
  constructor(data) {
    this.endTime = data.endTime || '';
    this.lastChangeTime = data.lastChangeTime || '';
    this.message = data.message || '';
    this.phase = data.phase || '';
  }
}
