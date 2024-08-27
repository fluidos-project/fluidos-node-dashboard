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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchNodes = async () => {
            try {
                const nodes = await API.getNodeInfo();
                setnodeArray(nodes);
                setIsLoading(false);
                //console.log(nodes);
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
                    <Typography variant="h3"> Node Info</Typography>
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
                    nodearray && nodearray.map(node => <SingleNode key={node.name} node={node} />)
                }

            </Grid>

        </>
    )
}

export default NodeInfoPage

