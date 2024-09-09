import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/SkeletonCard";
import { PeeringCadidateCard } from "../../components/PeeringCandidatesCard";
import { Link } from "react-router-dom";
import FlavorCard from "../../components/FlavorCard";
import InfoIcon from '@mui/icons-material/Info';

export function AvailableFlavorPage(props) {

    const [peeringArray, setPeeringArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchPeeringCandidates = async () => {
            try {
                const peeringCandidates = await API.getPeeringCandidates();
                console.log(peeringCandidates)
                setPeeringArray(peeringCandidates);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchPeeringCandidates();

    }, [])

    return (<>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant="h3">Flavors</Typography>
            </Grid>
            <Grid item md={12}>
                    <ButtonGroup>
                        <Button
                            component={Link}
                            relative="path"
                            size="medium"
                            variant="outlined"
                            to="/flavors"
                        >
                            Local
                        </Button>
                        <Button
                            component={Link}
                            relative="path"
                            size="medium"
                            variant="contained"
                            to="/flavors/available"
                        >
                            Available
                        </Button>
                        <Button
                            component={Link}
                            relative="path"
                            size="medium"
                            variant="outlined"
                            to="/flavors/acquired"
                        >
                            Acquired
                        </Button>
                    </ButtonGroup>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="body1"> <InfoIcon fontSize="small" color="primary" /> Available flavors are resources that can be bought from remote clusters </Typography>
                </Grid>
            {
                isLoading ? [...Array(6)].map((_, index) => (
                    <Grid item md={12} key={index} >
                        <SkeletonCard />
                    </Grid>
                )) :
                    peeringArray.length > 0 ? peeringArray.map(peeringC =>
                        <Grid item md={12} key={peeringC.metadata.name} >
                           <FlavorCard element={peeringC.spec.flavor} peeringcandidate={peeringC}/>
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> No Remote Flavors available at the moment.</Typography>

                    </Grid>
            }

        </Grid>
    </>
    )

}
