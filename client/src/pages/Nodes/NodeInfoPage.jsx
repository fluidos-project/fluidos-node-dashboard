import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Breadcrumbs, Button, CircularProgress, Modal, Paper, Typography, TextField, Box, Fade } from '@mui/material';
import API from '../../utils/API';
import { SingleNode } from '../../components/SingleNodeInfo';
import DeleteIcon from '@mui/icons-material/Delete';

// Function to validate IP address
const isValidIP = (ip) => {
    const regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return regex.test(ip);
};

function NodeInfoPage(props) {
    const [nodearray, setnodeArray] = useState([]);
    const [metricarray, setMetricArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ips, setIPs] = useState([]);

    const defaultPort = '30001';
    const [newNode, setNewNode] = useState({ ip: '', port: defaultPort });
    const [dataLoaded, setDataLoaded] = useState(false);

    const [showNodeModal, setShowNodeModal] = useState(false); // Used to show/hide the "Add Node" button and the form.
    const [ipError, setIpError] = useState(''); // Error message for IP validation
    const [formValid, setFormValid] = useState(false); // Form validation state
    const [showEditing, setShowEditing] = useState(false) //manage Delete button and Add Nodes Button

    const handleOpen = () => setShowNodeModal(true);
    const handleClose = () => setShowNodeModal(false);

    const modalStyle = {
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        borderRadius: 2,
        p: 3,
    };

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const nodes = await API.getNodes();
                const metrics = await API.getMetrics();
                const cm = await API.getNetManagerConfigCM();

                setnodeArray(nodes);
                setMetricArray(metrics);
                // if(cm.data.local) setIPs(cm.data.local); otherwise setIPs([])
                setIPs(cm.data.local ? cm.data.local : []);
                // if (cm.data.local) setIPs(cm.data.local
                // setIPs(cm.data.local);
                setIsLoading(false);
                setDataLoaded(true); // Set dataLoaded to true after data is fetched
            } catch (error) {
                console.error(error);
                props.configureAlert({ type: "error", message: error });
            }
        };

        fetchNodes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValidIP(newNode.ip)) {
            setShowNodeModal(false);
            console.log(newNode);
            setIpError('');
        } else {
            setIpError('Invalid IP address'); // Set IP error message
        }

        try {
            const result = await API.addFluidosNode(newNode);
            props.configureAlert({ type: "success", message: result.message })
            setIPs(oldIPs => [...oldIPs, `${newNode.ip}:${newNode.port}`]);
            setNewNode({ ip: '', port: defaultPort });

        } catch (error) {
            console.error(error)
            props.configureAlert({ type: "error", message: error });
        }
    };

    const handleChange = (field, value) => {
        setNewNode(old => ({ ...old, [field]: value }));
        if (field === 'ip') {
            setIpError(isValidIP(value) ? '' : 'Invalid IP address');
        }
    };

    const handleShowEditing = () => {
        setShowEditing(prev => !prev);
    }

    const handleDelete = async (indexList) => {
        console.log(indexList)
            ;

        try {
            const result = await API.deleteFluidosNode(indexList);
            const newIPs = ips.filter((ip, idx) => idx != indexList);
            setIPs(newIPs)
            props.configureAlert({ type: "success", message: result.message })

        } catch (error) {
            console.error(error)
            props.configureAlert({ type: "error", message: error });
        }
    }



    useEffect(() => {
        // Check if the form is valid
        setFormValid(isValidIP(newNode.ip));
    }, [newNode.ip]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid md={12}>
                    <Typography variant="h3" sx={{ mb: 2 }}>Overview</Typography>
                </Grid>
                <Grid md={12}>
                    <Box display="flex" alignItems="center" justifyContent="left" mb={2}>
                        <Typography mr={4} variant="h4">REMOTE FLUIDOS Nodes</Typography>
                        <Button variant="contained" onClick={handleShowEditing} color="primary">
                            {showEditing ? "View Node" : "Edit Nodes"}
                        </Button>
                    </Box>
                    {isLoading && (
                        <Grid md={12}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 2
                            }} component="div">
                                <CircularProgress />
                            </Box>
                        </Grid>
                    )}
                    {ips && ips.map((ip, idx) => (
                        <Box key={ip} mb={1} display="flex" alignItems="center" justifyContent="left" gap={1}>

                            {showEditing && <Button
                                onClick={() => handleDelete(idx)}

                                variant="contained"
                                size="small"
                                color="error"
                                sx={{
                                    minWidth: 'auto', // Rimuove la larghezza minima predefinita
                                    width: 30,        // Imposta la larghezza del pulsante
                                    height: 30,       // Imposta l'altezza del pulsante
                                    padding: 0,       // Rimuove il padding interno
                                }}
                            >
                                <DeleteIcon fontSize='small' />
                            </Button>}
                            <Typography variant="body1">IP{idx + 1}: {ip}</Typography>
                        </Box>
                    ))}
                    {
                        showEditing && <Button variant="contained" onClick={handleOpen} color="primary">
                            Add Node
                        </Button>
                    }
                </Grid>

                <Grid md={12}>
                    <Typography variant="h4">Kubernetes Nodes Metrics</Typography>
                </Grid>
                {isLoading ? (
                    <Grid md={12}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 2
                        }} component="div">
                            <CircularProgress />
                        </Box>
                    </Grid>
                ) : (
                    nodearray && metricarray && nodearray.map(node => (
                        <SingleNode
                            configureAlert={props.configureAlert}
                            key={node.metadata.name}
                            node={node}
                            metric={metricarray.find(x => x.metadata.name === node.metadata.name)}
                        />
                    ))
                )}
            </Grid>

            {/* Modal */}
            <Modal
                open={showNodeModal}
                onClose={handleClose}
                closeAfterTransition
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={showNodeModal}>
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                            Add New Node
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Node IP"
                                    variant="outlined"
                                    required
                                    value={newNode.ip}
                                    onChange={(e) => handleChange('ip', e.target.value)}
                                    placeholder='eg. 172.18.0.4'
                                    error={!!ipError}
                                    helperText={ipError}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Node Port"
                                    variant="outlined"
                                    required
                                    value={newNode.port}
                                    onChange={(e) => handleChange('port', e.target.value)}
                                    placeholder='eg. 30001'
                                />
                            </Box>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button variant="contained" color="primary" type='submit' disabled={!formValid}>
                                    Add
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default NodeInfoPage;
