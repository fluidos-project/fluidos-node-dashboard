import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Breadcrumbs, Paper, Typography } from '@mui/material';
import API from '../API';
import { useEffect, useState } from 'react';
import categories from '../utils/palette';
import { SingleNode } from '../components/SingleNodeInfo';

function NodeInfoPage() {


    const [nodearray, setnodeArray] = useState([]);

    useEffect(() => {

        const fetchNodes = async () => {
            try {
                const nodes = await API.getNodeInfo();
                setnodeArray(nodes);
                //console.log(nodes);
            } catch (error) {
                console.log(error)
            }
        }

        fetchNodes();
    }, [])


    return (
        <>
            <Grid container spacing={2}>
                <Grid md={12}>
                    <Typography variant="h3"> Node Info</Typography>
                </Grid>
                {
                    nodearray && nodearray.map(node => <SingleNode key={node.name} node={node} />)
                }

            </Grid>

        </>
    )
}

export default NodeInfoPage

