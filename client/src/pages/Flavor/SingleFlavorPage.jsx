import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";
import { useState, useEffect } from "react";
import { Breadcrumbs, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import calculateAge from "../../utils/age";




function SingleFlavorPage(props) {
    const [flavor, setFlavor] = useState();
    const { name } = useParams();
    //console.log(name);

    useEffect(() => {

        const fetchFlavor = async () => {
            try {
                const singleflavor = await API.getSingleFlavor(name);
                setFlavor(singleflavor);
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

         fetchFlavor();
    }, [])


    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={12}>
                    <Typography variant="h3"> Flavors</Typography>
                </Grid>
                <Grid item md={12}>
                    {flavor ? <DisplayFlavorInfo flavor={flavor} /> :
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center', 
                        padding: 2
                    }}>
                        <CircularProgress />
                    </Box>}
                </Grid>



            </Grid>
        </>
    )

}

export default SingleFlavorPage

function DisplayFlavorInfo(props) {

    const age = calculateAge(props.flavor.metadata.creationTimestamp);


    return (
        <>
            <Grid container spacing={2}>
                {/* Main Info Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="main info table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'primary.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Main Info
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Name</TableCell>
                                    <TableCell>{props.flavor.metadata.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Namespace</TableCell>
                                    <TableCell>{props.flavor.metadata.namespace}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Price</TableCell>
                                    <TableCell>{props.flavor.spec.price.amount === "" ? "-" : props.flavor.spec.price.amount} {props.flavor.spec.price.currency}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Age</TableCell>
                                    <TableCell>{age}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Flavor Specs Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="flavor specs table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'secondary.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Flavor Specs
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Availability</TableCell>
                                    <TableCell>{props.flavor.spec.availability ? "The Flavor is Available" : "The flavor is not Available"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Type of Flavor</TableCell>
                                    <TableCell>{props.flavor.spec.flavorType.typeIdentifier}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Architecture</TableCell>
                                    <TableCell>{props.flavor.spec.flavorType.typeData.characteristics.architecture}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">CPU</TableCell>
                                    <TableCell>{props.flavor.spec.flavorType.typeData.characteristics.cpu}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">GPU</TableCell>
                                    <TableCell>{props.flavor.spec.flavorType.typeData.characteristics.gpu.cores}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Storage</TableCell>
                                    <TableCell>{props.flavor.spec.flavorType.typeData.characteristics.storage}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Owner Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="owner table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'info.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Owner
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Domain</TableCell>
                                    <TableCell>{props.flavor.spec.owner.domain}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">IPv4 address</TableCell>
                                    <TableCell>{props.flavor.spec.owner.ip}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Cluster Name (Fluidos Node)</TableCell>
                                    <TableCell>{props.flavor.spec.owner.nodeID}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Location Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="location table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'warning.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Location
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Country</TableCell>
                                    <TableCell>{props.flavor.spec.location.country}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">City</TableCell>
                                    <TableCell>{props.flavor.spec.location.city}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Additional Note</TableCell>
                                    <TableCell>{props.flavor.spec.location.additionalNotes}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>

    );

}