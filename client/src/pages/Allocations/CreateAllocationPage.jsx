import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';

export function CreateAllocationPage(props) {
  const [formValues, setFormValues] = useState({
    name: '',
    solver: '',
    reservation: '',
    contract: '',
  });

  const [solvers, setSolvers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [contracts, setContracts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await API.getReservations();
        setReservations(reservations);
      } catch (error) {
        console.error(error);
        props.configureAlert({ type: 'error', message: error.message });
      }
    };

    fetchReservations();

  }, []);

  const handleChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleContractChange = async (e) => {
    const selectedContract = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      contract: selectedContract,
    }));

    try {
      
      // from all the reservations, I select the one with the correct contract to be able to retrieve the info about the Solver request
      const reservation = reservations.find((res) => res.status.contract.name === selectedContract);
      if (reservation) {
        const solver = await API.getSingleSolver(reservation.spec.solverID)

        setFormValues((prevValues) => ({
          ...prevValues,
          reservation: reservation.metadata.name,
          solver: reservation.spec.solverID,
        }));
        //console.log(solver)
      }
    } catch (error) {
      console.error(error);
      props.configureAlert({ type: 'error', message: error.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);

    try {
      const result = await API.addAllocation(formValues);
      console.log(result);
      props.configureAlert({ type: 'success', message: result.message });

      navigate(`/allocations`);
    } catch (error) {
      console.error(error);
      props.configureAlert({ type: 'error', message: error.message });
    }
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" mb={3}>
          Create New Allocation
        </Typography>
        <Grid container spacing={3}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              required
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>

          {/* Contract Select Field */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Contract</InputLabel>
              <Select
                label="Contract"
                value={formValues.contract}
                onChange={handleContractChange}
              >
                {reservations.map((reservation) => (
                  <MenuItem key={reservation.status.contract.name} value={reservation.status.contract.name}>
                    {reservation.status.contract.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Display Solver, and Reservation based on Contract Selection */}
          {formValues.contract && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Solver:</strong> {formValues.solver}
                </Typography>
                <Typography variant="body1">
                  <strong>Reservation:</strong> {formValues.reservation}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>

        {/* Submit Button */}
        <Box mt={4}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
