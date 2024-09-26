import { Allocation } from "../models/allocation";
import { Contract } from "../models/contract";
import { Flavor } from "../models/flavor";
import { NetworkManagerConfigurationCM } from "../models/networkManagerConfigurationCM";
import { NodeInfo, NodeMetric } from "../models/node";
import { PeeringCandidate } from "../models/peeringCandidate";
import { Reservation } from "../models/reservation";
import { Solver } from "../models/solver";
import { Transaction } from "../models/transactions";

// USE THESE FOR DEVELOPMENT
/*
const backend_address = 'localhost';
const backend_port = 3001;

const backend_address = window._env_?.REACT_APP_BACKEND_ADDRESS || 'localhost';
const backend_port = window._env_?.REACT_APP_BACKEND_PORT || '3001';
*/


//console.log(process.env);

const backend_address = window._env_.REACT_APP_BACKEND_ADDRESS || 'localhost';
const backend_port = window._env_.REACT_APP_BACKEND_PORT || '3001';


const SERVER_URL = `http://${backend_address}:${backend_port}/api`;


// FLAVOR API
const getFlavors = async () => {
  const response = await fetch(`${SERVER_URL}/flavors`, {
    method: 'GET'
  })

  if (response.ok) {
    const flavors = await response.json();
    const flavorObj = flavors.items.map(f => new Flavor(f));
    return flavorObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getSingleFlavor = async (name) => {
  const response = await fetch(`${SERVER_URL}/flavors/${name}`, {
    method: 'GET'
  })

  if (response.ok) {
    const flavor = await response.json();
    const flavorObj = new Flavor(flavor);
    return flavorObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const addFlavor = async(data) => {
  const response = await fetch(`${SERVER_URL}/flavors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }

}

const addFlavorYAML = async(data) => {
  const response = await fetch(`${SERVER_URL}/flavorsYAML`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }

}

const deleteFlavor = async (name) => {
  const response = await fetch(`${SERVER_URL}/flavors/${name}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

//SOLVER API
const getSolvers = async () => {
  const response = await fetch(`${SERVER_URL}/solvers`, {
    method: 'GET'
  })

  if (response.ok) {
    const solvers = await response.json();
    const solversObj = solvers.items.map(s => new Solver(s));
    return solversObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getSingleSolver = async (name) => {
  const response = await fetch(`${SERVER_URL}/solvers/${name}`, {
    method: 'GET'
  })

  if (response.ok) {
    const solver = await response.json();
    const solverObj = new Solver(solver);
    return solverObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const addSolver = async (request) => {
  const response = await fetch(`${SERVER_URL}/solvers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });
  console.log(request)  

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}


// PEERING CANDIDATES API
const getPeeringCandidates = async () => {
  const response = await fetch(`${SERVER_URL}/peeringcandidates`, {
    method: 'GET'
  })

  if (response.ok) {
    const peeringcandidates = await response.json();
    const peeringcandidatesObj = peeringcandidates.items.map(p => new PeeringCandidate(p));

    return peeringcandidatesObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getSinglePeeringCandidate = async (name) => {
  const response = await fetch(`${SERVER_URL}/peeringcandidates/${name}`, {
    method: 'GET'
  })

  if (response.ok) {
    const candidate = await response.json();
    const candidateObj = new PeeringCandidate(candidate);
    
    return candidateObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

// CONTRACTS API
const getContracts = async () => {
  const response = await fetch(`${SERVER_URL}/contracts`, {
    method: 'GET'
  })

  if (response.ok) {
    const contracts = await response.json();
    const contractsObj = contracts.items.map(c => new Contract(c));

    return contractsObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getSingleContract = async (name) => {
  const response = await fetch(`${SERVER_URL}/contracts/${name}`, {
    method: 'GET'
  })

  if (response.ok) {
    const contract = await response.json();
    const contractObj = new Contract(contract);

    return contractObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

// RESERVATIONS API
const getReservations = async () => {
  const response = await fetch(`${SERVER_URL}/reservations`, {
    method: 'GET'
  })

  if (response.ok) {
    const reservations = await response.json();
    const reservationsObj = reservations.items.map(r => new Reservation(r));

    return reservationsObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getSingleReservation = async (name) => {
  const response = await fetch(`${SERVER_URL}/reservations/${name}`, {
    method: 'GET'
  })

  if (response.ok) {
    const reservation = await response.json();
    const reservationObj = new Reservation(reservation);

    return reservationObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const addReservation = async (request) => {
  const response = await fetch(`${SERVER_URL}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

// ALLOCATIONS API
const getAllocations = async () => {
  const response = await fetch(`${SERVER_URL}/allocations`, {
    method: 'GET'
  })

  if (response.ok) {
    const allocations = await response.json();
    const allocationsObj = allocations.items.map(a => new Allocation(a));

    return allocationsObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getSingleAllocation = async (name) => {
  const response = await fetch(`${SERVER_URL}/allocations/${name}`, {
    method: 'GET'
  })

  if (response.ok) {
    const allocation = await response.json();
    const allocationObj = new Allocation(allocation);

    return allocationObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const addAllocation = async (request) => {
  const response = await fetch(`${SERVER_URL}/allocations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }

}

// TRANSACTIONS API
const getTransactions = async () => {
  const response = await fetch(`${SERVER_URL}/transactions`, {
    method: 'GET'
  })

  if (response.ok) {
    const transactions = await response.json();
    const transactionsObj = transactions.items.map(t => new Transaction(t));

    return transactionsObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getSingleTransaction = async (name) => {
  const response = await fetch(`${SERVER_URL}/transactions/${name}`, {
    method: 'GET'
  })

  if (response.ok) {
    const transaction = await response.json();
    const transactionObj = new Transaction(transaction);

    return transactionObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}



// NODES API
const getNodeInfo = async () => {
  const response = await fetch(`${SERVER_URL}/nodes`, {
    method: 'GET'
  })

  if (response.ok) {
    const nodesArray = await response.json();
    const nodesArrayObj = nodesArray.map(n => new NodeInfo(n));
    return nodesArrayObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getNodes = async () => {
  const response = await fetch(`${SERVER_URL}/nodes`, {
    method: 'GET'
  })

  if (response.ok) {
    const nodes = await response.json();
    const nodesObj = nodes.items.map(n => new NodeInfo(n));

    return nodesObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const getMetrics = async () => {
  const response = await fetch(`${SERVER_URL}/metrics`, {
    method: 'GET'
  })

  if (response.ok) {
    const nodes = await response.json();
    const nodesObj = nodes.items.map(n => new NodeMetric(n));

    return nodesObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

// ConfigMap API
const getNetManagerConfigCM = async () => {
  const response = await fetch(`${SERVER_URL}/configmaps/fluidos-network-manager-config`, {
    method: 'GET'
  })

  if (response.ok) {
    const cm = await response.json();
    const cmObj = new NetworkManagerConfigurationCM(cm);

    return cmObj
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const addFluidosNode = async (request) => {
  const response = await fetch(`${SERVER_URL}/nodes/addFluidosNode`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

const deleteFluidosNode = async (index) => {
  const response = await fetch(`${SERVER_URL}/nodes/deleteFluidosNode/${index}`, {
    method: 'PUT',
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  else {
    const errDetails = await response.text();
    throw errDetails;
  }
}





const API = {
  getFlavors, getSingleFlavor, addFlavor, addFlavorYAML, deleteFlavor, 
  getSolvers, getSingleSolver, addSolver,
  getPeeringCandidates, getSinglePeeringCandidate,
  getContracts, getSingleContract,
  getReservations, getSingleReservation, addReservation,
  getAllocations, getSingleAllocation, addAllocation,
  getTransactions, getSingleTransaction,
  getNodeInfo, getNodes, getMetrics, getNetManagerConfigCM, addFluidosNode, deleteFluidosNode
};
export default API 