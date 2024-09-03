import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Breadcrumbs, CircularProgress, Paper, Typography } from '@mui/material';
import API from '../../utils/API';
import { useEffect, useState } from 'react';
import categories from '../../utils/palette';
import { SingleNode } from '../../components/SingleNodeInfo';
import { Box } from '@mui/system';

function NodeInfoPage(props) {

    const [nodearray, setnodeArray] = useState([]);
    const [metricarray, setMetricArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [ips, setIPs] = useState([]);

    useEffect(() => {

        const fetchNodes = async () => {
            try {
                const nodes = await API.getNodes();
                const metrics = await API.getMetrics();
                const cm = await API.getNetManagerConfigCM();
                console.log(nodes)
                setnodeArray(nodes);
                setMetricArray(metrics)
                setIPs(cm.data.local)
                setIsLoading(false);
                
            } catch (error) {
                console.error(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchNodes();
    }, [])


    return (
        <>
            <Grid container spacing={2}>
            <Grid md={12}>
                    <Typography variant="h3"sx={{mb:2}}>Overview</Typography>
                </Grid> 
                <Grid md={12}>
                    <Typography variant="h4">Remote Fluidos Node IP</Typography>
                    {ips && ips.map((ip, idx) => <Typography key={ip} variant="body1">IP{idx+1}: {ip}</Typography> )}
                   
                </Grid> 

                <Grid md={12}>
                    <Typography variant="h4"> Nodes Metric</Typography>
                </Grid> 
                {
                    isLoading ? <Grid md={12}><Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2
                    }} component="div">
                        <CircularProgress />
                    </Box> </Grid> : 
                    nodearray && metricarray && nodearray.map(node => <SingleNode configureAlert={props.configureAlert} key={node.metadata.name} node={node} metric={metricarray.find(x=> x.metadata.name==node.metadata.name)} />)
                }

            </Grid>

        </>
    )
}

export default NodeInfoPage

