import { Flavor } from "../models/flavor";
import { NodeInfo } from "../models/node";
import { PeeringCandidate } from "../models/peeringCandidates";
import { Solver } from "../models/solver";
const SERVER_URL = "http://localhost:3001/api";

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

// NODES API
  const getNodeInfo = async () => {
    const response = await fetch(`${SERVER_URL}/nodes`, {
      method: 'GET'
    })
  
    if (response.ok) {
      const nodesArray = await response.json();
      const nodesArrayObj = nodesArray.map(n => new NodeInfo(n));
      //console.log(nodesArrayObj)
      return nodesArrayObj
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

const API = {getFlavors, getSingleFlavor, getSolvers, getSingleSolver, getPeeringCandidates ,getNodeInfo};
export default API 