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




function SingleTransactionPage(props) {
    const [transaction, setTransaction] = useState();
    const { name } = useParams();
    //console.log(name);

    useEffect(() => {

        const fetchTransaction = async () => {
            try {
                const singleTransaction = await API.getSingleTransaction(name);
                setTransaction(singleTransaction);
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchTransaction();
    }, [])


    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={12}>
                    <Typography variant="h3"> Transactions</Typography>
                </Grid>
                <Grid item md={12}>
                    {transaction ? <DisplayTransactionInfo transaction={transaction} /> :
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

export default SingleTransactionPage

function DisplayTransactionInfo(props) {

    const age = calculateAge(props.transaction.metadata.creationTimestamp);


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
                                    <TableCell>{props.transaction.metadata.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Namespace</TableCell>
                                    <TableCell>{props.transaction.metadata.namespace}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Age</TableCell>
                                    <TableCell>{age}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Expiration Time</TableCell>
                                    <TableCell>{new dayjs(props.transaction.spec.expirationTime).toString()}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Transaction info Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="Transaction specs table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'secondary.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Transaction info
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Flavor requested</TableCell>
                                    <TableCell>{props.transaction.spec.flavorID}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Buyer Node ID</TableCell>
                                    <TableCell>{props.transaction.spec.buyer.nodeID}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Liqo ID</TableCell>
                                    <TableCell>{props.transaction.spec.buyer.liqoID}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* Configuration Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="owner table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'error.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Configuration Details
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Type of Flavor requested</TableCell>
                                    <TableCell>{props.transaction.spec.configuration.type}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Specifications</TableCell>
                                    <TableCell>{`${props.transaction.spec.configuration.data.cpu} CPU - ${props.transaction.spec.configuration.data.memory} Memory - ${props.transaction.spec.configuration.data.pods} Pods  `}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>

    );

}
