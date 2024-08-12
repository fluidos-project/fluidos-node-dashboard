import { Flavor } from "./models/flavor";
import { NodeInfo } from "./models/node";
const SERVER_URL = "http://localhost:3001/api";

// Flavor API
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

const API = {getFlavors, getSingleFlavor, getNodeInfo};
export default API 