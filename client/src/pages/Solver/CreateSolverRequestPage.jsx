// FormPage.js
import React, { useState } from 'react';
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
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from '@mui/material';

export function CreateSolverRequestPage () {
  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    intentID: '',
    architectureFilter: { mode: 'match', value: '' },
    cpuFilter: { mode: 'match', min: '', max: '' },
    memoryFilter: { mode: 'match', min: '', max: '' },
    podsFilter: { mode: 'match', min: '', max: '' },
    findCandidate: true,
    reserveAndBuy: true,
    establishPeering: true,
  });

  const [errors, setErrors] = useState({});

  // validate fields
  const validateFields = () => {
    const newErrors = {};

    if (!formValues.name) newErrors.name = 'Name is Required';
    if (!formValues.type) newErrors.type = 'FlavorType is Required';
    if (!formValues.intentID) newErrors.intentID = ' Intent ID is Required';
    if (formValues.type === 'K8Slice') {
      if (!formValues.architectureFilter.value) newErrors.architectureFilter = 'Architecture is Required';
      if (!formValues.cpuFilter.min) newErrors.cpuFilter = 'CPU value is Required';
      if (!formValues.memoryFilter.min) newErrors.memoryFilter = 'Memory value is Required';
      if (!formValues.podsFilter.min) newErrors.podsFilter = 'Pods value is Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // update fields form
  const handleChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // updates K8slice fields
  const handleSubFieldChange = (field, subField, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: { ...prevValues[field], [subField]: value },
    }));
  };


  const handleSubmit = () => {
    if (validateFields()) {
      console.log(formValues);
      // Logica di invio del form
    }
  };

  // rendering new fields
  const renderAdditionalFields = (field, label) => (
    <Grid item xs={12} sm={4}>
      <Typography variant="h6">{label}</Typography>
      <RadioGroup
        row
        value={formValues[field].mode}
        onChange={(e) => handleSubFieldChange(field, 'mode', e.target.value)}
      >
        <FormControlLabel value="match" control={<Radio />} label="Match" />
        <FormControlLabel value="range" control={<Radio />} label="Range" />
      </RadioGroup>
      {formValues[field].mode === 'match' ? (
        <TextField
          label="Value"
          fullWidth
          required
          error={!!errors[field]}
          helperText={errors[field]}
          value={formValues[field].min}
          onChange={(e) => handleSubFieldChange(field, 'min', e.target.value)}
        />
      ) : (
        <Box display="flex" gap={2}>
          <TextField
            label="Min Value"
            fullWidth
            required
            error={!!errors[field]}
            helperText={errors[field]}
            value={formValues[field].min}
            onChange={(e) => handleSubFieldChange(field, 'min', e.target.value)}
          />
          <TextField
            label="Max Value (Optional)"
            fullWidth
            value={formValues[field].max}
            onChange={(e) => handleSubFieldChange(field, 'max', e.target.value)}
          />
        </Box>
      )}
    </Grid>
  );

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Create new Request
      </Typography>
      <Grid container spacing={3}>
        {/* Name */}
        <Grid item xs={12}>
          <TextField
            label="Nome"
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
            value={formValues.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Grid>

        {/* FlavorType (Select) */}
        <Grid item xs={12}>
          <FormControl fullWidth error={!!errors.type}>
            <InputLabel>FlavorType</InputLabel>
            <Select
              label="FlavorType"
              required
              value={formValues.type}
              onChange={(e) => handleChange('type', e.target.value)}
            >
              <MenuItem value="K8Slice">K8Slice</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
            {errors.type && <Typography color="error">{errors.type}</Typography>}
          </FormControl>
        </Grid>

        {/* Intent ID */}
        <Grid item xs={12}>
          <TextField
            label="Intent ID"
            fullWidth
            required
            error={!!errors.intentID}
            helperText={errors.intentID}
            value={formValues.intentID}
            onChange={(e) => handleChange('intentID', e.target.value)}
          />
        </Grid>

        {/* Flags */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.findCandidate}
                onChange={(e) => handleChange('findCandidate', e.target.checked)}
              />
            }
            label="Find Candidate"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.reserveAndBuy}
                onChange={(e) =>
                  handleChange('reserveAndBuy', e.target.checked)
                }
              />
            }
            label="Reserve And Buy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.establishPeering}
                onChange={(e) =>
                  handleChange('establishPeering', e.target.checked)
                }
              />
            }
            label="Establish Peering"
          />
        </Grid>


        {/* fields for K8Slice */}
        {formValues.type === 'K8Slice' && (
          <>
            {renderAdditionalFields('cpuFilter', 'CPU')}
            {renderAdditionalFields('memoryFilter', 'Memory')}
            {renderAdditionalFields('podsFilter', 'Pods')}
          </>
        )}
      </Grid>

      {/*  ArchitectureFilter */}
      {formValues.type === 'K8Slice' && (
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Architecture</Typography>
            <TextField
              label="Value"
              fullWidth
              required
              error={!!errors.architectureFilter}
              helperText={errors.architectureFilter}
              value={formValues.architectureFilter.value}
              onChange={(e) =>
                handleSubFieldChange('architectureFilter', 'value', e.target.value)
              }
            />
          </Grid>
        )}

      {/* Submit */}
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Send Request
        </Button>
      </Box>
    </Box>
  );
};


