import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Grid, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/SkeletonCard";
import { PeeringCadidateCard } from "../../components/PeeringCandidatesCard";


export function AllocationPage(props) {

    const [allocationsArray, setAllocationsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchAllocations = async () => {
            try {
                const allocations = await API.getAllocations();
                console.log(allocations)
                setAllocationsArray(allocations);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchAllocations();

    }, [])

    return (<>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant="h3"> Allocations</Typography>
            </Grid>
            {
                isLoading ? [...Array(6)].map((_, index) => (
                    <Grid item md={4} key={index} >
                        <SkeletonCard />
                    </Grid>
                )) :
                    allocationsArray.length > 0 ? allocationsArray.map(allocation =>
                        <Grid item md={4} key={allocation.metadata.name} >
                            
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> No Allocations available at the moment.</Typography>

                    </Grid>
            }

        </Grid>
    </>
    )


}
