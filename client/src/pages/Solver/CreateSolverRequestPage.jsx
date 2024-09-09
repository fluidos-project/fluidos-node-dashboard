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
import API from '../../utils/API';
import { useNavigate } from 'react-router-dom';

export function CreateSolverRequestPage(props) {
  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    intentID: '',
    architectureFilter: { mode: 'Match', value: '' },
    cpuFilter: { mode: 'Match', min: '', max: '', value: '' },
    memoryFilter: { mode: 'Match', min: '', max: '', value: '' },
    podsFilter: { mode: 'Match', min: '', max: '', value: '' },
    findCandidate: true,
    reserveAndBuy: true,
    establishPeering: true,
  });

  const navigate = useNavigate();

  // update fields form
  const handleChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  // updates filter fields
  const handleSubFieldChange = (field, subField, value) => {
    setFormValues((prevValues) => {
      const updatedField = { ...prevValues[field], [subField]: value };

      if (subField === 'mode') {
        if (value === 'Match') {
          updatedField.min = '';
          updatedField.max = '';
        } else if (value === 'Range') {
          updatedField.value = '';
        }
      } else if (subField === 'value' && prevValues[field].mode === 'Match') {
        updatedField.min = '';
        updatedField.max = '';
      } else if ((subField === 'min' || subField === 'max') && prevValues[field].mode === 'Range') {
        updatedField.value = '';
      }

      return {
        ...prevValues,
        [field]: updatedField,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formValues);

    try {
      const result = await API.addSolver(formValues);

      props.configureAlert({ type: "success", message: result.message });

      navigate(`/solvers/${formValues.name}`);
    } catch (error) {
      console.error(error)
      props.configureAlert({ type: "error", message: error });
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
        <FormControlLabel value="Match" control={<Radio />} label="Match" />
        <FormControlLabel value="Range" control={<Radio />} label="Range" />
      </RadioGroup>
      {formValues[field].mode === 'Match' ? (
        <TextField
          label="Value"
          fullWidth
          required
          value={formValues[field].value}
          onChange={(e) => handleSubFieldChange(field, 'value', e.target.value)}
        />
      ) : (
        <Box display="flex" gap={2}>
          <TextField
            label="Min Value"
            fullWidth
            required
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
      <form onSubmit={handleSubmit}>
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
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>

          {/* FlavorType (Select) */}
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>FlavorType</InputLabel>
              <Select
                label="FlavorType"
                required
                value={formValues.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <MenuItem value="K8Slice">K8Slice</MenuItem>
                <MenuItem value="VM">VM</MenuItem>
                <MenuItem value="Service">Service</MenuItem>
                <MenuItem value="Sensor">Sensor</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Intent ID */}
          <Grid item xs={12}>
            <TextField
              label="Intent ID"
              fullWidth
              required
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
              label={formValues.type === 'K8Slice'? "Establish Liqo Peering" : `Activate ${formValues.type}`}
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
          {/* fiels for other FlavorType */}
          { formValues.type !== 'K8Slice' &&
            <Typography variant="h5" m={3}>
              FlavorType Not Implemented at the moment.
            </Typography>
          }
        </Grid>

        {/*  ArchitectureFilter */}
        {formValues.type === 'K8Slice' && (
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Architecture</Typography>
            <TextField
              label="Value"
              fullWidth
              required
              value={formValues.architectureFilter.value}
              onChange={(e) =>
                handleSubFieldChange('architectureFilter', 'value', e.target.value)
              }
            />
          </Grid>
        )}

        {/* Submit */}
        <Box mt={4}>
          <Button variant="contained" color="primary" disabled={formValues.type !== 'K8Slice'} type="submit">
            Send Request
          </Button>
        </Box>
      </form>
    </Box>
  );
}
