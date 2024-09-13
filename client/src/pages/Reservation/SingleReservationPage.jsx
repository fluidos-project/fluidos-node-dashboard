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



function SingleReservationPage(props) {
    const [reservation, setReservation] = useState();
    const { name } = useParams();

    useEffect(() => {

        const fetchReservation = async () => {
            try {
                const singlereservation = await API.getSingleReservation(name);
                setReservation(singlereservation);
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchReservation();
    }, [])


    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={12}>
                    <Typography variant="h3"> Reservations</Typography>
                </Grid>
                <Grid item md={12}>
                    {reservation ? <DisplayReservationInfo reservation={reservation} /> :
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

export default SingleReservationPage

function DisplayReservationInfo(props) {

    const age = calculateAge(props.reservation.metadata.creationTimestamp);

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
                                <TableCell>{props.reservation.metadata.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Namespace</TableCell>
                                <TableCell>{props.reservation.metadata.namespace}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Reservation Specs Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ minWidth: 300 }} aria-label="reservation specs table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'secondary.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                       Reservation Specs
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Type of Resource</TableCell>
                                <TableCell>{props.reservation.spec.configuration.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Solver ID</TableCell>
                                <TableCell><Link relative="path" to={`../../solvers/${props.reservation.spec.solverID}`}>{props.reservation.spec.solverID}</Link></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Configuration requested</TableCell>
                                <TableCell>{`${props.reservation.spec.configuration.data.cpu} CPU - ${props.reservation.spec.configuration.data.memory} Memory - ${props.reservation.spec.configuration.data.pods} Pods`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Seller Node ID</TableCell>
                                <TableCell>{`${props.reservation.spec.seller.nodeID} (${props.reservation.spec.seller.ip})`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Peering Candidate Reserved</TableCell>
                                <TableCell><Link relative="path" to={`../../flavors/available/${props.reservation.spec.peeringCandidate.name}`}>{props.reservation.spec.peeringCandidate.name}</Link></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Status Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 300 }} aria-label="status table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'warning.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Status Info
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow> 
                                <TableCell component="th" scope="row">Contract </TableCell>
                                <TableCell>{props.reservation.status.contract.name !='' ? <Link relative="path" to={`../../contracts/${props.reservation.status.contract.name}`}>{props.reservation.status.contract.name}</Link> : "Not Available"} </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Transaction ID </TableCell>
                                <TableCell>{props.reservation.status.transactionID != '' ? <Link relative="path" to={`../../transactions/${props.reservation.status.transactionID}`}>{props.reservation.status.transactionID}</Link> : "Not Available"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Message from Candidate </TableCell>
                                <TableCell>{props.reservation.status.phase.message}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Reservation  Phase </TableCell>
                                <TableCell>{props.reservation.status.reservePhase}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Purchase Phase </TableCell>
                                <TableCell>{props.reservation.status.purchasePhase}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>

        </>

    );

}
