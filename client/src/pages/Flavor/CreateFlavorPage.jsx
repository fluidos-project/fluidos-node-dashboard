import { useState } from "react"
import {Box,} from '@mui/material';
import { NotFoundPage } from "../utils/NotFoundPage";
import { FlavorFormPage1 } from "./FlavorForm.jsx/FlavorFormPage1";
import { FlavorFormK8Slice } from "./FlavorForm.jsx/FlavorFormK8Slice";
import { useNavigate } from "react-router-dom";

export function CreateFlavorPage(props) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [flavor, setFlavor] = useState({
        name: '',
        spec: {
            availability: true,
            flavorType: {
                typeIdentifier: 'K8Slice',
                typeData: {
                    characteristics: {
                        architecture: '',
                        cpu: '',
                        gpu: {
                            cores: '',
                            memory: '',
                            model: ''
                        },
                        memory: '',
                        pods: '',
                        storage: ''
                    },
                    policies: {
                        partitionability: {
                            cpuMin: '',
                            cpuStep: '',
                            gpuMin: '',
                            gpuStep: '',
                            memoryMin: '',
                            memoryStep: '',
                            podsMin: '',
                            podsStep: ''
                        }
                    },
                    properties: {}
                }
            },
            location: {
                additionalNotes: 'None',
                city: '',
                country: '',
                latitude: '',
                longitude: ''
            },
            price: {
                amount: '',
                currency: '',
                period: '365'
            }
        }
    });

    const handleChange = (keyPath, value) => {
        setFlavor((prevFlavor) => {
          const updatedFlavor = { ...prevFlavor };
          let current = updatedFlavor;
    
          // Itera fino al penultimo livello
          for (let i = 0; i < keyPath.length - 1; i++) {
            current = current[keyPath[i]];
          }
    
          // Aggiorna il valore
          current[keyPath[keyPath.length - 1]] = value;
    
          return updatedFlavor;
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(flavor);

        try {
            //const result = await API.addSolver(formValues);
      
            //props.configureAlert({ type: "success", message: result.message });
      
            navigate("/flavors")
          } catch (error) {
            console.error(error)
            props.configureAlert({ type: "error", message: error });
          }

    };
    

    const goToNextPage = () => setCurrentPage(currentPage + 1);
    const goToPreviousPage = () => setCurrentPage(currentPage - 1);
    
    const renderSecondPage = () =>{
        switch (flavor.spec.flavorType.typeIdentifier){
            case "K8Slice":  return <FlavorFormK8Slice configureAlert={props.configureAlert} flavor={flavor} setFlavor={setFlavor} goToPreviousPage={goToPreviousPage} handleChange={handleChange} handleSubmit={handleSubmit} />;
            default: return <NotFoundPage />
        }
    }

    return (
        <Box>
            {currentPage === 1 ? (
                <FlavorFormPage1 flavor={flavor} setFlavor={setFlavor} handleChange={handleChange} goToNextPage={goToNextPage} />
            ): renderSecondPage() }
            
        </Box>
    );
}
