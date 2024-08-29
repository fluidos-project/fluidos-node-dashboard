import { Link, useParams } from "react-router-dom";
import API from "../../utils/API";
import { useState, useEffect } from "react";
import { Breadcrumbs, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import calculateAge from "../../utils/age";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import handleCopy from "../../utils/handleCopy";


function SingleSolverPage(props) {
    const [solver, setsolver] = useState();
    const { name } = useParams();
    //console.log(name);

    useEffect(() => {

        const fetchSolver = async () => {
            try {
                const singlesolver = await API.getSingleSolver(name);
                setsolver(singlesolver);
                console.log(singlesolver)
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchSolver();
    }, [])


    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={12}>
                    <Typography variant="h3"> Solvers</Typography>
                </Grid>
                <Grid item md={12}>
                    {solver ? <DisplaySolverInfo configureAlert={props.configureAlert} solver={solver} /> :
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

export default SingleSolverPage

function DisplaySolverInfo(props) {

    const age = calculateAge(props.solver.metadata.creationTimestamp);

    const getFilterString = (filter) => {
        if (filter.name === "Match") {
            return `match ${filter.data.value}`;
        } else if (filter.name === "Range") {
            return `range from ${filter.data.min || "-"} to ${filter.data.max || "-"}`;
        }
        return "Unknown filter type";
    }


    const copyClipboard=() =>{
        handleCopy(props.solver.status.credentials.token, props.configureAlert);
       };


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
                                <TableCell>{props.solver.metadata.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Namespace</TableCell>
                                <TableCell>{props.solver.metadata.namespace}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Solver Specs Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ minWidth: 300 }} aria-label="solver specs table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'secondary.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Solver Specs
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Type of requested Flavor</TableCell>
                                <TableCell>{props.solver.spec.selector.flavorType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Architecture Filter</TableCell>
                                <TableCell>{getFilterString(props.solver.spec.selector.filters.architectureFilter)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">CPU Filter</TableCell>
                                <TableCell>{getFilterString(props.solver.spec.selector.filters.cpuFilter)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Memory Filter</TableCell>
                                <TableCell>{getFilterString(props.solver.spec.selector.filters.memoryFilter)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Pods Filter</TableCell>
                                <TableCell>{getFilterString(props.solver.spec.selector.filters.podsFilter)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Status Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ minWidth: 300 }} aria-label="status table">
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
                                <TableCell component="th" scope="row">Discovery Phase</TableCell>
                                <TableCell>{props.solver.status.discoveryPhase}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Find-Candidate Phase</TableCell>
                                <TableCell>{props.solver.status.findCandidate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Reservation Phase</TableCell>
                                <TableCell>{props.solver.status.reservationPhase}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Buying Phase</TableCell>
                                <TableCell>{props.solver.status.reserveAndBuy}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Peering Phase</TableCell>
                                <TableCell>{props.solver.status.discoveryPhase}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Message from Solver</TableCell>
                                <TableCell>{props.solver.status.solverPhase.message}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Credentials Table */}
            {props.solver.status.credentials.clusterID != '' &&
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="credentials table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'warning.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Credentials
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">clusterID</TableCell>
                                    <TableCell>{props.solver.status.credentials.clusterID}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Cluster Name</TableCell>
                                    <TableCell>{props.solver.status.credentials.clusterName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Access Endpoint</TableCell>
                                    <TableCell>{props.solver.status.credentials.endpoint}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Liqo Token</TableCell>
                                    <TableCell onClick={copyClipboard} sx={{ cursor: 'pointer' }}>{props.solver.status.credentials.token}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            }
        </Grid>

        </>
    )

}