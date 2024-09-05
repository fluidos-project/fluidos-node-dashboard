import { useEffect, useState } from "react"
import API from "../../utils/API";
import { Stack, Container } from "@mui/system"
import { Breadcrumbs, Grid, Typography, Box, Button, ButtonGroup } from "@mui/material"
import { Link } from "react-router-dom"
import FlavorCard from "../../components/FlavorCard"
import { SkeletonCard } from "../../components/SkeletonCard"
import { Flavor } from "../../models/flavor";
import InfoIcon from '@mui/icons-material/Info';

export function RemoteFlavorPage(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [flavorsArray, setFlavorsArray] = useState([]);


    useEffect(() => {

        const fetchRemoteFlavors = async () => {
            try {
                const contracts = await API.getContracts();
                const flavors = contracts.map(c => new Flavor(c.spec.flavor));
                setFlavorsArray(flavors);
                setIsLoading(false)
                console.log(flavors)
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })

            }
        }

        fetchRemoteFlavors();
    }, [])




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
                            variant="outlined"
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
                            variant="contained"
                            to="/flavors/acquired"
                        >
                            Acquired
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="body1"> <InfoIcon fontSize="small" color="primary" /> Acquired Flavors are flavors already purchased from remote providers  </Typography>
                </Grid>

                {
                    isLoading ? [...Array(6)].map((_, index) => (
                        <Grid item md={4} key={index} >
                            <SkeletonCard />
                        </Grid>
                    )) :
                        flavorsArray.length > 0 ? flavorsArray.map(flavor =>
                            <Grid item md={4} key={flavor.metadata.name} >
                                <FlavorCard element={flavor} />
                            </Grid>
                        ) : <Grid item md={4} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                            <Typography variant="h5"> There are no flavors purchased</Typography>

                        </Grid>
                }


            </Grid>
        </>
    )
}