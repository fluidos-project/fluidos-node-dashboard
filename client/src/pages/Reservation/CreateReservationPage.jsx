import React, { useState, useEffect } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Grid
} from '@mui/material';
import { PeeringCadidateCard } from '../../components/PeeringCandidatesCard';
import API from '../../utils/API';

export function CreateReservationPage(props) {
    // Stato per i campi del form raggruppato
    const [formValues, setFormValues] = useState({
        name: '',
        solverId: '',
        reserve: true,
        buy: true,
        peeringCandidate: '',
        flavorType: '',
        cpu: '',
        memory: '',
        pods: ''
    });

    const [solverOptions, setSolverOptions] = useState([]);
    const [peeringOptions, setPeeringOptions] = useState([]);
    const [selectedPeeringDetails, setSelectedPeeringDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const solvers = await API.getSolvers();
                setSolverOptions(solvers);

                const peeringCandidates = await API.getPeeringCandidates();
                setPeeringOptions(peeringCandidates);

                console.log(solvers);
                console.log(peeringCandidates);
            } catch (error) {
                console.log(error);
                props.configureAlert({ type: "error", message: error.message });
            }
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handlePeeringChange = (event) => {
        const selectedId = event.target.value;
        setFormValues((prevValues) => ({ ...prevValues, peeringCandidate: selectedId }));

        // Prendi i dettagli del candidato di peering e mostra la card
        const selectedDetails = peeringOptions.find(candidate => candidate.metadata.name === selectedId);
        setSelectedPeeringDetails(selectedDetails);
        console.log(selectedDetails);

        selectedDetails && setFormValues((prevValues) => ({
            ...prevValues,
            flavorType: selectedDetails.spec.flavor.spec.flavorType.typeIdentifier
        }));
    };

    const handleRadioChange = (event) => {
        const { value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            buy: value === 'reserveAndBuy'
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);

        try {
            const result = await API.addReservation(formValues);

            props.configureAlert({ type: "success", message: result.message });

             navigate(`/reservations/${formValues.name}`);
        } catch (error) {
            console.error(error);
            props.configureAlert({ type: "error", message: error.message });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>Solver ID</InputLabel>
                        <Select
                            name="solverId"
                            value={formValues.solverId}
                            onChange={handleChange}
                        >
                            {solverOptions.map(solver => (
                                <MenuItem key={solver.metadata.name} value={solver.metadata.name}>
                                    {solver.metadata.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="reserve-buy-options"
                            name="reserve-buy-options"
                            value={formValues.buy ? 'reserveAndBuy' : 'onlyReserve'}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel
                                value="onlyReserve"
                                control={<Radio />}
                                label="Only Reserve"
                            />
                            <FormControlLabel
                                value="reserveAndBuy"
                                control={<Radio />}
                                label="Reserve And Buy"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel>Peering Candidate</InputLabel>
                        <Select
                            name="peeringCandidate"
                            value={formValues.peeringCandidate}
                            onChange={handlePeeringChange}
                        >
                            {peeringOptions.filter(candidate => candidate.spec.available).map(candidate => (
                                <MenuItem key={candidate.metadata.name} value={candidate.metadata.name}>
                                    {candidate.metadata.name}
                                </MenuItem>
                            ))}
                            {peeringOptions.filter(candidate => candidate.spec.available).length === 0 && (
                                <MenuItem value="No Peering Candidate Available">
                                    No Peering Candidate Available
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        label="Flavor Type"
                        name="flavorType"
                        value={formValues.flavorType}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>

                {/* Mostra i campi CPU, Memory e Pods solo se FlavorType è K8Slice */}
                {formValues.flavorType === 'K8Slice' && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="CPU"
                                name="cpu"
                                type="text"
                                value={formValues.cpu}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Memory"
                                name="memory"
                                type="text"
                                value={formValues.memory}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Pods"
                                name="pods"
                                type="text"
                                value={formValues.pods}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                    </>
                )}

                <Grid item xs={12}>
                    <Button type="submit" disabled={peeringOptions.filter(candidate => candidate.spec.available).length === 0} variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>

                {selectedPeeringDetails && (
                    <Grid item xs={12} md={12}>
                        <PeeringCadidateCard element={selectedPeeringDetails} />
                    </Grid>
                )}
            </Grid>
        </form>
    );
};
