import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Breadcrumbs, Paper, Typography } from '@mui/material';
import API from '../utils/API';
import { useEffect, useState } from 'react';
import categories from '../utils/palette';

export function SingleNode(props) {

    let err = false;

    let CPU_usage_Milli = 0;
    let CPU_used = 0;
    let CPU_total_Milli = 0;

    let Memory_used = 0;
    let Memory_usage_Ki = 0;
    let MemoryTotal_Ki =0;

    

    const convertToKiB = (memoryString) => {
        const match = memoryString.match(/^(\d+)([KMGT]?i)$/);    
        
        if (!match) {
          props.configureAlert({type: "error", message:"Parsing memory metrics"})
        }
      
        const value = parseInt(match[1], 10);
        const unit = match[2];
      
        switch (unit) {
          case 'Ki':
            return value; 
          case 'Mi':
            return value * 1_024; 
          case 'Gi':
            return value * 1_024 * 1_024; 
          case 'Ti':
            return value * 1_024 * 1_024 * 1_024; 
         
            }
        }

    if (props.node && props.metric) {

        CPU_usage_Milli = parseInt(props.metric.usage.cpu.replace('n', ''), 10) / 1000000;
        CPU_total_Milli = parseInt(props.node.status.capacity.cpu) * 1000;
        CPU_used = (CPU_usage_Milli / CPU_total_Milli) * 100;
        CPU_used= CPU_used.toFixed(2)

        Memory_usage_Ki = convertToKiB(props.metric.usage.memory);
        MemoryTotal_Ki = convertToKiB(props.node.status.capacity.memory);
        Memory_used = (Memory_usage_Ki / MemoryTotal_Ki) * 100;
        Memory_used = Memory_used.toFixed(2);
    }else{
       err = true;
    }

    const paletteNames = Object.keys(categories);
    const randomPaletteName1 = paletteNames[Math.floor(Math.random() * paletteNames.length)];
    const randomPaletteName2 = paletteNames[Math.floor(Math.random() * paletteNames.length)];
    const selectedPalette1 = categories[randomPaletteName1];
    const selectedPalette2 = categories[randomPaletteName2];

    return (
        <>
            <Grid md={12}>
                <Typography variant="h6">{`Node name: ${props.node.metadata.name} ${err ? "(unknown complete metrics)" : ""}`}</Typography>
            </Grid>
            <Grid md={12}>
                <Typography variant="body1">Pods: {props.node.status.allocatable.pods}</Typography>
                <Typography variant="body1">Architecture: {props.node.metadata.labels.architecture}</Typography>
                <Typography variant="body1">OS: {props.node.metadata.labels.os}</Typography>
            </Grid>
            <Grid md={6} xs={12}>
                <Paper
                    elevation={4}
                    sx={{
                        padding: 2,
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                    <Typography variant="h6" gutterBottom > CPU</Typography>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: CPU_used, label: `%Used (${CPU_used}%)` },
                                    { id: 1, value: 100 - CPU_used, label: `%Free (${100 - CPU_used}%)` },
                                ],

                            },
                        ]}
                        width={600}
                        height={300}
                        colors={selectedPalette1}
                    />
                    <Typography variant="body1" gutterBottom > Total: {CPU_total_Milli} millicore</Typography>

                </Paper>
            </Grid>

            <Grid md={6} xs={12}>
                <Paper
                    elevation={4}
                    sx={{
                        padding: 2,
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                    <Typography variant="h6" gutterBottom > Memory</Typography>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: Memory_used, label: `%Used (${Memory_used}%)` },
                                    { id: 1, value: `${100 - Memory_used > 0 ? 100 - Memory_used : 0}`, label: `%Free (${100 - Memory_used > 0 ? 100 - Memory_used : 0}%)` },
                                ],

                            },
                        ]}
                        width={600}
                        height={300}
                        colors={selectedPalette2}
                    />
                    <Typography variant="body1" gutterBottom > Total: {MemoryTotal_Ki}Ki</Typography>

                </Paper>
            </Grid>

        </>
    )

}

