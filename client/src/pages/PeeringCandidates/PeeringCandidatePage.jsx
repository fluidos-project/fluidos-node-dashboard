import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Grid, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/SkeletonCard";
import { SolverCard } from "../../components/SolverCard";
import { PeeringCadidateCard } from "../../components/PeeringCandidatesCard";


export function PeeringCandidatePage() {

    const [peeringArray, setPeeringArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchPeeringCandidates = async () => {
            try {
                const peeringCandidates = await API.getPeeringCandidates();

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
                <Typography variant="h3"> Peering Candidates</Typography>
            </Grid>
            {
                isLoading ? [...Array(6)].map((_, index) => (
                    <Grid item md={4} key={index} >
                        <SkeletonCard />
                    </Grid>
                )) :
                    peeringArray.length > 0 ? peeringArray.map(peeringC =>
                        <Grid item md={4} key={peeringC.metadata.name} >
                           <PeeringCadidateCard element={peeringC} />
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> No Peering Candidates available at the moment.</Typography>

                    </Grid>
            }

        </Grid>
    </>
    )

}
