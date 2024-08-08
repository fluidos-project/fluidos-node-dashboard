import { useEffect, useState} from "react"
import API from "../API"

export function FlavorsPage(){
   
    useEffect(()=>{

        const fetchFlavors = async ()=>{
            try{
                const flavors = await API.getFlavors();
                console.log(flavors)
            }catch(error) {
                console.log(error)
            }
        }

        fetchFlavors();
    })

    return(<>
    Flavors
    </>
    )

}
