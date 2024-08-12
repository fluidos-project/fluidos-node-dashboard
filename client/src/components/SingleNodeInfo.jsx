import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Breadcrumbs, Paper, Typography } from '@mui/material';
import API from '../API';
import { useEffect, useState } from 'react';
import categories from '../utils/palette';
export function SingleNode(props) {

    const CPU_used = props.node.cpuUsageM / props.node.cpuTotalM
    const Memory_used = props.node.memoryUsageKi / props.node.memoryTotalKi

    const paletteNames = Object.keys(categories);

    const randomPaletteName1 = paletteNames[Math.floor(Math.random() * paletteNames.length)];
    const randomPaletteName2 = paletteNames[Math.floor(Math.random() * paletteNames.length)];

    const selectedPalette1 = categories[randomPaletteName1];
    const selectedPalette2 = categories[randomPaletteName2];


    return (
        <>
            <Grid md={12}>
                <Typography variant="h6">Node name: {props.node.name}</Typography>
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
                                    { id: 0, value: CPU_used, label: `%Used (${CPU_used.toFixed(2)}%)` },
                                    { id: 1, value: 1 - CPU_used, label: `%Free (${100 - CPU_used.toFixed(2)}%)` },
                                ],

                            },
                        ]}
                        width={600}
                        height={300}
                        colors={selectedPalette1}
                    />
                     <Typography variant="body1" gutterBottom > Total: {props.node.cpuTotalM}millicore</Typography>

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
                                    { id: 0, value: Memory_used, label: `%Used (${Memory_used.toFixed(2)}%)` },
                                    { id: 1, value: 1 - Memory_used, label: `%Free (${100 - Memory_used.toFixed(2)}%)` },
                                ],

                            },
                        ]}
                        width={600}
                        height={300}
                        colors={selectedPalette2}
                    />
                     <Typography variant="body1" gutterBottom > Total: {props.node.memoryTotalKi}Ki</Typography>

                </Paper>
            </Grid>

        </>
    )
}

