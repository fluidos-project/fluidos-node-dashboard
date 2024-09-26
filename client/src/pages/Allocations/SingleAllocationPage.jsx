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



function SingleAllocationPage(props) {
    const [allocation, setAllocation] = useState();
    const { name } = useParams();

    useEffect(() => {

        const fetchAllocation = async () => {
            try {
                const singleAllocation = await API.getSingleAllocation(name); 
                setAllocation(singleAllocation);
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchAllocation();
    }, [])


    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={12}>
                    <Typography variant="h3"> Allocations</Typography>
                </Grid>
                <Grid item md={12}>
                    {allocation ? <DisplayAllocationInfo allocation={allocation} /> :
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

export default SingleAllocationPage

function DisplayAllocationInfo(props) {

    const age = calculateAge(props.allocation.metadata.creationTimestamp);

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
                                <TableCell>{props.allocation.metadata.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Namespace</TableCell>
                                <TableCell>{props.allocation.metadata.namespace}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Age</TableCell>
                                <TableCell>{age}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Allocation Specs Table */}
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table sx={{ minWidth: 300 }} aria-label="allocation specs table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ backgroundColor: 'secondary.main', color: 'white' }} >
                                    <Typography variant="h6" gutterBottom>
                                        Allocation Specs
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Contract</TableCell>
                                <TableCell><Link relative="path" to={`../../contracts/${props.allocation.spec.contract.name}`}>{props.allocation.spec.contract.name}</Link></TableCell>
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
                                <TableCell component="th" scope="row">Message </TableCell>
                                <TableCell>{props.allocation.status.message}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Last Update  </TableCell>
                                <TableCell>{dayjs(props.allocation.status.lastUpdateTime).toString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Allocation status </TableCell>
                                <TableCell>{props.allocation.status.status}</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </Grid>

        </>

    );

}
