import { Flavor } from "./models/flavor";
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


const API = {getFlavors, getSingleFlavor};
export default API 