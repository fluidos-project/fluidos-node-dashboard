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
import validateName from '../../utils/validateName';

export function CreateAllocationPage(props) {
  const [formValues, setFormValues] = useState({
    name: '',
    solver: '',
    reservation: '',
    contract: '',
  });

  const [nameError, setNameError] = useState('');
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
        props.configureAlert({ type: 'error', message: error });
      }
    };

    fetchReservations();
  }, []);


  const handleChange = (field, value) => {
    if (field === 'name') {
      if (!validateName(value)) {
        setNameError(
          'Invalid name'
        );
      } else {
        setNameError('');
      }
    }

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
      const reservation = reservations.find((res) => res.status.contract.name === selectedContract);
      if (reservation) {
        setFormValues((prevValues) => ({
          ...prevValues,
          reservation: reservation.metadata.name,
          solver: reservation.spec.solverID,
        }));
      }
    } catch (error) {
      console.error(error);
      props.configureAlert({ type: 'error', message: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(formValues.name)) {
      setNameError(
        'Invalid name'
      );
      return;
    }

    console.log(formValues);

    try {
      const result = await API.addAllocation(formValues);
      console.log(result);
      props.configureAlert({ type: 'success', message: result.message });

      navigate(`/allocations`);
    } catch (error) {
      console.error(error);
      props.configureAlert({ type: 'error', message: error });
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
              error={!!nameError} 
              helperText={nameError} 
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
          <Button variant="contained" color="primary" type="submit" disabled={!!nameError}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
