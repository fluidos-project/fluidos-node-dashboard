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




function SinglePeeringCandidatePage(props) {
    const [peeringCandidate, setPeeringCandidate] = useState();
    const { name } = useParams();
    //console.log(name);

    useEffect(() => {

        const fetchPeeringCandidate = async () => {
            try {
                const singlepeer = await API.getSinglePeeringCandidate(name);
                setPeeringCandidate(singlepeer);
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchPeeringCandidate();
    }, [])


    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={12}>
                    <Typography variant="h3"> Flavors</Typography>
                </Grid>
                <Grid item md={12}>
                    {peeringCandidate ? <DisplayPeeringCInfo peeringCandidate={peeringCandidate} /> :
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

export default SinglePeeringCandidatePage

function DisplayPeeringCInfo(props) {

    const age = calculateAge(props.peeringCandidate.metadata.creationTimestamp);

    return (
        <><Grid container spacing={2}>
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
                                <TableCell>{props.peeringCandidate.metadata.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Namespace</TableCell>
                                <TableCell>{props.peeringCandidate.metadata.namespace}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Solver Request</TableCell>
                                <TableCell><Link relative="path" to={`../../../solvers/${props.peeringCandidate.spec.solverID}`}>{props.peeringCandidate.spec.solverID}</Link></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Associated Flavor Name</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.metadata.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Availability</TableCell>
                                <TableCell>{props.peeringCandidate.spec.available ? "True" : "False"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Price</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.price.amount != "" ? `${props.peeringCandidate.spec.flavor.spec.price.amount} ${props.peeringCandidate.spec.flavor.spec.currency}` : "-"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Candidate Specs Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ minWidth: 300 }} aria-label="candidate specs table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'secondary.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Peering Candidate Specs
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Type of Candidate</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.flavorType.typeIdentifier}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Architecture</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.flavorType.typeData.characteristics.architecture}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">CPU cores</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.flavorType.typeData.characteristics.cpu}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Memory</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.flavorType.typeData.characteristics.gpu.cores}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Pods</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.flavorType.typeData.characteristics.pods}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Storage</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.flavorType.typeData.characteristics.storage}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Partitionability Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="partition table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'warning.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Partitionability Info
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">CPU (min ; step) </TableCell>
                                <TableCell>{`${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.cpuMin};${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.cpuStep}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Memory (min ; step) </TableCell>
                                <TableCell>{`${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.memoryMin};${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.memoryStep}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">GPU (min ; step) </TableCell>
                                <TableCell>{`${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.gpuMin};${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.gpuStep}`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Pods (min ; step) </TableCell>
                                <TableCell>{`${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.podsMin};${props.peeringCandidate.spec.flavor.spec.flavorType.typeData.policies.partitionability.podsStep}`}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Location Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ minWidth: 300 }} aria-label="location table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'success.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Location
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Country</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.location.country}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">City</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.location.city}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Notes</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.location.additionalNotes}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Owner Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="owner table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'info.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Owner Info
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Domain</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.owner.domain}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">IPv4</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.owner.ip}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Cluster Name (Fluidos Node)</TableCell>
                                <TableCell>{props.peeringCandidate.spec.flavor.spec.owner.nodeID}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>

        </>

    );

}
