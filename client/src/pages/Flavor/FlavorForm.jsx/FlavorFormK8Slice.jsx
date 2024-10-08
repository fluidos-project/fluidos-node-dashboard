import {
    Box,
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export function FlavorFormK8Slice({ flavor, handleChange, goToPreviousPage, handleSubmit }) {
    const [errors, setErrors] = useState({
        cpuStep: false,
        memoryStep: false,
        gpuStep: false,
        podsStep: false,
    });

    // Validation function to ensure that Min is divisible by Step
    const validatePartitionability = (minValue, stepValue) => {
        return stepValue !== 0 && minValue % stepValue === 0;
    };

    const handlePartitionabilityChange = (path, value, minKey, stepKey) => {
        handleChange(path, value);

        const minValue = path[path.length - 1] === minKey ? value : flavor.spec.flavorType.typeData.policies.partitionability[minKey];
        const stepValue = path[path.length - 1] === stepKey ? value : flavor.spec.flavorType.typeData.policies.partitionability[stepKey];

        // Validate if Min is divisible by Step
        if (!validatePartitionability(minValue, stepValue)) {
            setErrors((prevErrors) => ({ ...prevErrors, [stepKey]: true }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [stepKey]: false }));
        }
    };

    const hasErrors = () => {
        return Object.values(errors).some((error) => error);
    };

    return (
        <Box p={4}>
            <Typography variant="h4" mb={3}>
                Create New Flavor - Page 2
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Characteristics */}
                <Typography variant="h5" mb={2}>Characteristics</Typography>
                <Grid container spacing={3}>
                    {/* Architecture */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Architecture"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.architecture}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'architecture'], e.target.value)}
                            required
                            placeholder='eg. amd64'
                        />
                    </Grid>

                    {/* CPU */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="CPU (in nanocores)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.cpu}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'cpu'], e.target.value)}
                            required
                            placeholder='eg. 1000000'
                            type='number'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">n</InputAdornment>,
                            }}
                            inputProps={{ min:0, step: 1}}

                        />
                    </Grid>

                    {/* Memory */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Memory (in Mi)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.memory}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'memory'], e.target.value)}
                            required
                            placeholder='eg. 4096'
                            type='number'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Mi</InputAdornment>,
                            }}
                            inputProps={{ min:0, step: 0.01}}
                        />
                    </Grid>

                    {/* GPU Model */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="GPU Model"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.gpu.model}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'gpu', 'model'], e.target.value)}

                            placeholder='eg. NVIDIA Tesla K80'
                        />
                    </Grid>

                    {/* GPU Cores */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="GPU (in fraction)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.gpu.cores}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'gpu', 'cores'], e.target.value)}

                            placeholder='eg. 1; 0,5; 0,1'
                            type='number'
                            inputProps={{ min: 0, max:1, step: 0.001 }}

                        />
                    </Grid>

                    {/* GPU Memory */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="GPU Memory (in Mi)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.gpu.memory}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'gpu', 'memory'], e.target.value)}
                            placeholder='eg. 3860000'
                            type='number'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Mi</InputAdornment>,
                            }}
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                    </Grid>

                    {/* Pods */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Pods"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.pods}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'pods'], e.target.value)}
                            required
                            type='number'
                            placeholder='eg. 20'
                            inputProps={{ min: 0, step: 1 }}
                        />
                    </Grid>

                    {/* Storage */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Storage (in Gi)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.characteristics.storage}
                            onChange={(e) => handleChange(['spec', 'flavorType', 'typeData', 'characteristics', 'storage'], e.target.value)}
                            required
                            type='number'
                            placeholder='eg. 100'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Gi</InputAdornment>,
                            }}
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                    </Grid>
                </Grid>

                {/*  Partitionability */}
                <Typography variant="h5" mt={4} mb={2}>Partitionability</Typography>
                <Grid container spacing={3}>
                    {/* CPU Min */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="CPU Min (in nanocores)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.cpuMin}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'cpuMin'],
                                e.target.value,
                                'cpuMin',
                                'cpuStep'
                            )}
                            required
                            placeholder='eg. 500'
                            type='number'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">n</InputAdornment>,
                            }}
                            inputProps={{ min: 0, step: 1 }}
                        />
                    </Grid>

                    {/* CPU Step */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="CPU Step (in nanocore)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.cpuStep}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'cpuStep'],
                                e.target.value,
                                'cpuMin',
                                'cpuStep'
                            )}
                            required
                            placeholder='eg. 250'
                            type='number'
                            error={errors.cpuStep}
                            helperText={errors.cpuStep ? "CPU Min must be divisible by CPU Step." : ''}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">n</InputAdornment>,
                            }}
                            inputProps={{ min: 0, step: 1 }}
                        />
                    </Grid>

                    {/* Memory Min */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Memory Min (in Mi)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.memoryMin}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'memoryMin'],
                                e.target.value,
                                'memoryMin',
                                'memoryStep'
                            )}
                            required
                            placeholder='eg. 1'
                            type='number'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Mi</InputAdornment>,
                            }}
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                    </Grid>

                    {/* Memory Step */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Memory Step (in Mi)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.memoryStep}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'memoryStep'],
                                e.target.value,
                                'memoryMin',
                                'memoryStep'
                            )}
                            required
                            placeholder='eg. 512'
                            type='number'
                            error={errors.memoryStep}
                            helperText={errors.memoryStep ? "Memory Min must be divisible by Memory Step." : ''}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Mi</InputAdornment>,
                            }}
                            inputProps={{ min: 0, step: 0.01 }}
                        />
                    </Grid>

                    {/* GPU Min */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="GPU Min (in fraction)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.gpuMin}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'gpuMin'],
                                e.target.value,
                                'gpuMin',
                                'gpuStep'
                            )}

                            placeholder='eg. 0,5'
                            type='number'
                            inputProps={{ min: 0, max:1, step: 0.001 }}
                        />
                    </Grid>

                    {/* GPU Step */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="GPU Step (in fraction)"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.gpuStep}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'gpuStep'],
                                e.target.value,
                                'gpuMin',
                                'gpuStep'
                            )}
                            inputProps={{ min: 0, max:1, step: 0.001 }}

                            placeholder='eg. 0,1'
                            type='number'
                            error={errors.gpuStep}
                            helperText={errors.gpuStep ? "GPU Min must be divisible by GPU Step." : ''}
                        />
                    </Grid>

                    {/* Pods Min */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Pods Min"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.podsMin}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'podsMin'],
                                e.target.value,
                                'podsMin',
                                'podsStep'
                            )}
                            inputProps={{ min: 0, step: 1 }}
                            required
                            type='number'
                            placeholder='eg. 10'
                        />
                    </Grid>

                    {/* Pods Step */}
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Pods Step"
                            fullWidth
                            value={flavor.spec.flavorType.typeData.policies.partitionability.podsStep}
                            onChange={(e) => handlePartitionabilityChange(
                                ['spec', 'flavorType', 'typeData', 'policies', 'partitionability', 'podsStep'],
                                e.target.value,
                                'podsMin',
                                'podsStep'
                            )}
                            inputProps={{ min: 0, step: 1 }}
                            required
                            type='number'
                            placeholder='eg. 1'
                            error={errors.podsStep}
                            helperText={errors.podsStep ? "Pods Min must be divisible by Pods Step." : ''}
                        />
                    </Grid>
                </Grid>

                {/* Buttons */}
                <Box mt={4} display="flex" gap={2}>
                    <Button variant="outlined" color="primary" onClick={goToPreviousPage}>
                        Previous
                    </Button>
                    <Button variant="contained" color="primary" type='submit' disabled={hasErrors()}>
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default FlavorFormK8Slice;
