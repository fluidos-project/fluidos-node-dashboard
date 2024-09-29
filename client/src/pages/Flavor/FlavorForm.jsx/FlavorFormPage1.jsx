import { Box, Button, Grid, MenuItem, Select, TextField, Typography, FormControl, InputLabel, Modal, Backdrop, Fade } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/API';
import yaml from 'js-yaml';
import validateName from '../../../utils/validateName';


export function FlavorFormPage1({ flavor, setFlavor, nameError, goToNextPage, handleChange, configureAlert }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [yamlContent, setYamlContent] = useState('');
    const [yamlError, setYamlError] = useState(false);

    const handleSubmitConfig = async (e) => {
        e.preventDefault();

        console.log(yamlContent)
        try {
            yaml.load(yamlContent);
            const result = await API.addFlavorYAML(yamlContent);

            configureAlert({ type: "success", message: result.message });

            navigate("/flavors")

        } catch (error) {
            console.error(error)
            setYamlError(true)
            configureAlert({ type: "error", message: error });
        }

    }

    const modalStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 20,
        borderRadius: 2,
        p: 4,
        maxHeight: '75vh',
        overflow: 'auto',
    };

    const handleChangeYAML = (event) => {
        setYamlContent(event.target.value);
        setYamlError(false)
    };

    return (
        <>
            <Box p={4}>
                <Typography variant="h4" mb={3}>
                    Create New Flavor - Page 1
                </Typography>
                <form onSubmit={goToNextPage}>
                    {/* Sezione General Info */}
                    <Typography variant="h5" mb={2}>General Info</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Name"
                                fullWidth
                                required
                                value={flavor.name}
                                onChange={(e) => handleChange(['name'], e.target.value)}
                                placeholder='eg. flavor1234'
                                error={!!nameError}
                                helperText={nameError}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Flavor Type</InputLabel>
                                <Select
                                    label="Flavor Type"
                                    value={flavor.spec.flavorType.typeIdentifier}
                                    onChange={(e) => handleChange(['spec', 'flavorType', 'typeIdentifier'], e.target.value)}
                                    required
                                    readOnly
                                >
                                    <MenuItem value="K8Slice">K8Slice</MenuItem>
                                    <MenuItem value="VM">VM</MenuItem>
                                    <MenuItem value="Sensor">Sensor</MenuItem>
                                    <MenuItem value="Service">Service</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Location */}
                    <Typography variant="h5" mt={4} mb={2}>Location</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Country"
                                fullWidth
                                value={flavor.spec.location.country}
                                onChange={(e) => handleChange(['spec', 'location', 'country'], e.target.value)}
                                required
                                placeholder='eg. Italy'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="City"
                                fullWidth
                                value={flavor.spec.location.city}
                                onChange={(e) => handleChange(['spec', 'location', 'city'], e.target.value)}
                                placeholder='eg. Turin'
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Additional Notes"
                                fullWidth
                                value={flavor.spec.location.additionalNotes}
                                onChange={(e) => handleChange(['spec', 'location', 'additionalNotes'], e.target.value)}
                                placeholder='eg. Some text'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Longitude"
                                fullWidth
                                value={flavor.spec.location.longitude}
                                onChange={(e) => handleChange(['spec', 'location', 'longitude'], e.target.value)}
                                required
                                placeholder='eg. 7'
                                type='number'
                                inputProps={{ min: -90, max: 90, step: 0.0001 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Latitude"
                                fullWidth
                                value={flavor.spec.location.latitude}
                                onChange={(e) => handleChange(['spec', 'location', 'latitude'], e.target.value)}
                                required
                                placeholder='eg. 45'
                                type='number'
                                inputProps={{ min: -90, max: 90, step: 0.0001 }}
                            />
                        </Grid>
                    </Grid>

                    {/* Price */}
                    <Typography variant="h5" mt={4} mb={2}>Price</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Amount"
                                fullWidth
                                value={flavor.spec.price.amount}
                                onChange={(e) => handleChange(['spec', 'price', 'amount'], e.target.value)}
                                required
                                placeholder='eg. 479.99'
                                type='number'
                                inputProps={{ min: 0, step: 0.01 }}

                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required>
                                <InputLabel>Currency</InputLabel>
                                <Select
                                    label="Currency"
                                    value={flavor.spec.price.currency}
                                    onChange={(e) => handleChange(['spec', 'price', 'currency'], e.target.value)}
                                >
                                    {/* Principali valute monetarie */}
                                    <MenuItem value="USD">USD - United States Dollar</MenuItem>
                                    <MenuItem value="EUR">EUR - Euro</MenuItem>
                                    <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
                                    <MenuItem value="GBP">GBP - British Pound</MenuItem>
                                    <MenuItem value="AUD">AUD - Australian Dollar</MenuItem>
                                    <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
                                    <MenuItem value="CHF">CHF - Swiss Franc</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                label="Period in days"
                                fullWidth
                                value={flavor.spec.price.period}
                                onChange={(e) => handleChange(['spec', 'price', 'period'], e.target.value)}
                                required
                                placeholder='eg. 365'
                                type='number'
                                inputProps={{ min: 0, step: 1 }}
                            />
                        </Grid>
                    </Grid>

                    {/* next page */}
                    <Box mt={4} display="flex" gap={2}>
                        <Button variant="contained" type="submit" color="primary" disabled={!!nameError}>
                            Next
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleOpen}>
                            Add YAML Config
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* Modal for YAML config*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" mb={2}>
                            Flavor YAML Manifest
                        </Typography>

                        <TextField
                            multiline
                            fullWidth
                            rows={10}
                            variant="outlined"
                            value={yamlContent}
                            onChange={handleChangeYAML}
                            sx={{ mb: 2 }}
                            error={yamlError}
                            helperText={yamlError && "Check configuration"}
                        />

                        <Button variant="contained" color="primary" onClick={handleSubmitConfig}>
                            Submit Configuration
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
