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
                const singlepeer = await API.getPeeringCandidates();
                console.log(singlepeer[0])
                setPeeringCandidate(singlepeer[0]); // -- FIX API -- 
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
                    <Typography variant="h3"> Peering Candidates</Typography>
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
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Namespace</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Solver Request Name</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Associated Flavor Name</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Availability</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Price</TableCell>
                                <TableCell>{age}</TableCell>
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
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Architecture</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">CPU cores</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Memory</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Pods</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Storage</TableCell>
                                <TableCell>{}</TableCell>
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
                                <TableCell component="th" scope="row">CPU (min - step) </TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Memory (min - step) </TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">GPU (min - step) </TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Pods (min - step) </TableCell>
                                <TableCell>{}</TableCell>
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
                                <TableCell colSpan={2} sx={{ backgroundColor: 'error.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Status
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Country</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">City</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Notes</TableCell>
                                <TableCell>{}</TableCell>
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
                                <TableCell colSpan={2} sx={{ backgroundColor: 'success.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Owner Info
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Domain</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">IPv4</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Node ID</TableCell>
                                <TableCell>{}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            
        </Grid>

        </>

    );

}
