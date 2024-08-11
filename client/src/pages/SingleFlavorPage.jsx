import { Link, useParams } from "react-router-dom";
import API
    from "../API";
import { useState, useEffect } from "react";
import { Breadcrumbs, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';



function SingleFlavorPage(props) {
    const [flavor, setFlavor] = useState();
    const { name } = useParams();
    //console.log(name);

    useEffect(() => {

        const fetchFlavor = async () => {
            try {
                const singleflavor = await API.getSingleFlavor(name);
                console.log(singleflavor)
                setFlavor(singleflavor);
            } catch (error) {
                console.log(error)
            }
        }

        fetchFlavor();
    }, [])


    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="text.primary">Resources</Typography>
                        <Typography color="text.primary">
                            <Link to="/flavors">
                                Flavors
                            </Link>
                        </Typography>
                        <Typography color="text.primary">{name}</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="h3"> Flavors</Typography>
                </Grid>
                <Grid item md={12}>
                    {flavor && <DisplayFlavorInfo flavor={flavor} />}
                </Grid>



            </Grid>
        </>
    )

}

export default SingleFlavorPage

function DisplayFlavorInfo(props) {

    const creationDate = dayjs(props.flavor.metadata.creationTimestamp);
    const now = dayjs();

    const years = now.diff(creationDate, 'year');
    const months = now.diff(creationDate, 'month') % 12;
    const days = now.diff(creationDate, 'day') % 30;
    const hours = now.diff(creationDate, 'hour') % 24;

    const age = [
        years > 0 ? `${years} year${years === 1 ? '' : 's'}` : '',
        months > 0 ? `${months} month${months === 1 ? '' : 's'}` : '',
        days > 0 ? `${days} day${days === 1 ? '' : 's'}` : '',
        hours > 0 ? `${hours} hour${hours === 1 ? '' : 's'}` : ''
    ].filter(Boolean).join(', ');


    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={6} xs={12}>
                    <Paper
                        elevation={4} // Aggiunge un'ombra leggera
                        sx={{
                            padding: 2, // Padding interno
                            borderRadius: 1, // Bordo smussato
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <Typography variant="h6" gutterBottom>
                            Main Info
                        </Typography>
                        <Typography variant="body1" > Name: {props.flavor.metadata.name}</Typography>
                        <Typography variant="body1" > Namespace: {props.flavor.metadata.namespace}</Typography>
                        <Typography variant="body1" > Price: {props.flavor.spec.price.amount == "" ? "-" : props.flavor.spec.price.amount} {props.flavor.spec.price.currency} </Typography>
                        <Typography variant="body1" > Age: {age} </Typography>

                    </Paper>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Paper
                        elevation={4} // Aggiunge un'ombra leggera
                        sx={{
                            padding: 1, // Padding interno
                            borderRadius: 2, // Bordo smussato
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <Typography variant="h6" gutterBottom>
                            Flavor Specs
                        </Typography>
                        {props.flavor.spec.availability ? <Typography variant="body1" color="green" sx={{ mb: 1.5 }}> The Flavor is Available </Typography> : <Typography variant="body1" sx={{ mb: 1.5 }} color="red"> The flavor is not Available </Typography>}
                        <Typography variant="body1" > Type of Flavor: {props.flavor.spec.flavorType.typeIdentifier}</Typography>
                        <Typography variant="body1" > Architecture: {props.flavor.spec.flavorType.typeData.characteristics.architecture}</Typography>
                        <Typography variant="body1" > CPU: {props.flavor.spec.flavorType.typeData.characteristics.cpu}</Typography>
                        <Typography variant="body1" > GPU: {props.flavor.spec.flavorType.typeData.characteristics.gpu.model}</Typography>
                        <Typography variant="body1" > Storage: {props.flavor.spec.flavorType.typeData.characteristics.storage }</Typography>

                    </Paper>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Paper
                        elevation={4} // Aggiunge un'ombra leggera
                        sx={{
                            padding: 1, // Padding interno
                            borderRadius: 2, // Bordo smussato
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <Typography variant="h6" gutterBottom>
                            Owner
                        </Typography>
                        <Typography variant="body1" >Domain: {props.flavor.spec.owner.domain}</Typography>
                        <Typography variant="body1" >IPv4 address: {props.flavor.spec.owner.ip}</Typography>
                        <Typography variant="body1" >Node ID: {props.flavor.spec.owner.nodeID}</Typography>
                    </Paper>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Paper
                        elevation={4} // Aggiunge un'ombra leggera
                        sx={{
                            padding: 1, // Padding interno
                            borderRadius: 2, // Bordo smussato
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <Typography variant="h6" gutterBottom>
                            Location
                        </Typography>
                        <p>info</p>
                    </Paper>
                </Grid>

            </Grid>
        </>
    )

}