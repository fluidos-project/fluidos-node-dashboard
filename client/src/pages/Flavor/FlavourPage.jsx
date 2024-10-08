import { useEffect, useState } from "react"
import API from "../../utils/API";
import { Stack, Container } from "@mui/system"
import { Breadcrumbs, Grid, Typography, Box, Button, ButtonGroup } from "@mui/material"
import { Link } from "react-router-dom"
import FlavorCard from "../../components/FlavorCard"
import { SkeletonCard } from "../../components/SkeletonCard"
import { Flavor } from "../../models/flavor";
import InfoIcon from '@mui/icons-material/Info';

export function FlavorsPage(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [flavorsArray, setFlavorsArray] = useState([]);



    useEffect(() => {

        const fetchLocalFlavors = async () => {
            try {
                const flavors = await API.getFlavors();
                setFlavorsArray(flavors);
                setIsLoading(false);
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })

            }
        }
        fetchLocalFlavors();
    }, [])

    const handleDelete = async (idx, name) => {
        //console.log(idx, name)
        try {
            const result = await API.deleteFlavor(name);
            //console.log(result)
      
            props.configureAlert({ type: "success", message: result.message });
            const newArray = flavorsArray.filter(f => f.metadata.name !=name);
            //console.log(newArray)
            setFlavorsArray(newArray);
            
          } catch (error) {
            console.error(error)
            props.configureAlert({ type: "error", message: error });
          }
    }

    // Make the Skeleton last at leats 1 second
    /*
    useEffect(() => {
        
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // Cleanup del timer
        return () => clearTimeout(timer);
    }, []);
    */

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Typography variant="h3"> Flavors</Typography>
                </Grid>
                <Grid item md={12}>
                    <ButtonGroup>
                        <Button
                            component={Link}
                            relative="path"
                            size="medium"
                            variant="contained"
                            to="/flavors"
                        >
                            Local
                        </Button>
                        <Button
                            component={Link}
                            relative="path"
                            size="medium"
                            variant="outlined"
                            to="/flavors/available"
                        >
                            Available
                        </Button>
                        <Button
                            component={Link}
                            relative="path"
                            size="medium"
                            variant="outlined"
                            to="/flavors/acquired"
                        >
                            Acquired
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="body1"> <InfoIcon fontSize="small" color="primary" /> Local Flavors are resources that providers make available for sale</Typography>
                </Grid>
                <Grid item md={12}>
                    <Button
                        component={Link}
                        relative="path"
                        size="medium"
                        variant="contained"
                        to="new"
                    >
                        Add Flavor
                    </Button>
                </Grid>

                {
                    isLoading ? [...Array(6)].map((_, index) => (
                        <Grid item md={12} key={index} >
                            <SkeletonCard />
                        </Grid>
                    )) :
                        flavorsArray.length > 0 ? flavorsArray.map((flavor, idx) =>
                            <Grid item md={12}  key={flavor.metadata.name} >
                                <FlavorCard element={flavor} idx= {idx} handleDelete={handleDelete} configureAlert={props.configureAlert}/>
                            </Grid>
                        ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                            <Typography variant="h5"> There are no flavors available at the moment</Typography>

                        </Grid>
                }



            </Grid >
        </>
    )

}
