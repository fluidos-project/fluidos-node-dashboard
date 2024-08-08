import { Flavor } from "./models/flavor";
const SERVER_URL = "http://localhost:3001/api";

// Flavor API
const getFlavors = async () => {
    const response = await fetch(`${SERVER_URL}/flavors`, {
      method: 'GET'
    })
    //console.log(response)
  
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

const API = {getFlavors};
export default API 