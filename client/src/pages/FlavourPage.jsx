import { useEffect, useState } from "react"
import API from "../API"
import { Stack, Container } from "@mui/system"
import { Breadcrumbs, Grid, Typography, Box } from "@mui/material"
import { Link } from "react-router-dom"
import FlavorCard from "../components/FlavorCard"

export function FlavorsPage() {
    const [flavorsArray, setFlavorsArray] = useState([]);

    useEffect(() => {

        const fetchFlavors = async () => {
            try {
                const flavors = await API.getFlavors();
                //console.log(flavors)
                setFlavorsArray(flavors);
            } catch (error) {
                console.log(error)
            }
        }

        fetchFlavors();
    }, [])

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="text.primary">Resources</Typography>
                        <Typography color="text.primary">Flavors</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="h3"> Flavors</Typography>
                </Grid>
                {
                    flavorsArray.length > 0 ? flavorsArray.map(flavor =>
                        <Grid item md={4} key={flavor.metadata.name} >
                            <FlavorCard element={flavor} />
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> There are no flavors available at the moment</Typography>
                    </Grid>
                }


            </Grid>
        </>
    )

}
