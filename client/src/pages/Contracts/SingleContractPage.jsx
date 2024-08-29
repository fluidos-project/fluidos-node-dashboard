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
import handleCopy from "../../utils/handleCopy";





function SingleContractPage(props) {
    const [contract, setContract] = useState();
    const { name } = useParams();
    //console.log(name);

    useEffect(() => {

        const fetchcontract = async () => {
            try {
                const singlecontract = await API.getSingleContract(name);
                console.log(singlecontract)
                setContract(singlecontract);
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchcontract();
    }, [])



    return (
        <>
            <Grid container spacing={2}>

                <Grid item md={12}>
                    <Typography variant="h3"> Contracts</Typography>
                </Grid>
                <Grid item md={12}>
                    {contract ? <DisplayContractInfo contract={contract} configureAlert={props.configureAlert} /> :
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

export default SingleContractPage

function DisplayContractInfo(props) {

    const age = calculateAge(props.contract.metadata.creationTimestamp);
    const copyClipboard=() =>{
     handleCopy(props.contract.spec.peeringTargetCredentials.token, props.configureAlert);
    };

    


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
                                    <TableCell>{props.contract.metadata.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Namespace</TableCell>
                                    <TableCell>{props.contract.metadata.namespace}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Age</TableCell>
                                    <TableCell>{age}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

                {/* contract info Table */}
                <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table sx={{ minWidth: 300 }} aria-label="contract specs table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ backgroundColor: 'secondary.main', color: 'white' }} >
                                        <Typography variant="h6" gutterBottom>
                                            Contract info
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Seller Node ID</TableCell>
                                    <TableCell>{props.contract.spec.seller.nodeID}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Seller Cluster Name</TableCell>
                                    <TableCell>{`${props.contract.spec.peeringTargetCredentials.clusterName} (${props.contract.spec.peeringTargetCredentials.endpoint})`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Expiration Date</TableCell>
                                    <TableCell>{new dayjs(props.contract.spec.expirationTime).toString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Transaction ID</TableCell>
                                    <TableCell><Link relative="path" to={`../../transactions/${props.contract.spec.transactionID}`}>{props.contract.spec.transactionID}</Link></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Flavor Bought</TableCell>
                                    <TableCell><Link relative="path" to={`../../flavors-remote/${props.contract.spec.flavor.metadata.name}`}>{props.contract.spec.flavor.metadata.name}</Link></TableCell>
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
                                            Contract specs
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row">Type of Flavor requested</TableCell>
                                    <TableCell>{props.contract.spec.flavor.spec.flavorType.typeIdentifier}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Specification</TableCell>
                                    <TableCell>{`${props.contract.spec.configuration.data.cpu} CPU - ${props.contract.spec.configuration.data.memory} Memory - ${props.contract.spec.configuration.data.pods} Pods  `}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

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
                                    <TableCell>{props.contract.spec.peeringTargetCredentials.clusterID}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Cluster Name</TableCell>
                                    <TableCell>{props.contract.spec.peeringTargetCredentials.clusterName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Access Endpoint</TableCell>
                                    <TableCell>{props.contract.spec.peeringTargetCredentials.endpoint}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">Liqo Token</TableCell>
                                    <TableCell onClick={copyClipboard} sx={{ cursor: 'pointer' }}>{props.contract.spec.peeringTargetCredentials.token}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>

    );

}
