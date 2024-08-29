import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Button, Grid, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/SkeletonCard";
import { SolverCard } from "../../components/SolverCard";
import { Link } from "react-router-dom";




export function SolverPage(props) {

    const [solversArray, setSolversArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchSolvers = async () => {
            try {
                const solvers = await API.getSolvers();

                setSolversArray(solvers);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchSolvers();

    }, [])

    return (<>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant="h3"> Solvers</Typography>
            </Grid>
            <Grid item md={12}>
                <Button
                    component={Link}
                    relative="path"
                    size="medium"
                    variant="contained"
                    to="buy"
                >
                    Buy resources
                </Button>
            </Grid>
            {
                isLoading ? [...Array(6)].map((_, index) => (
                    <Grid item md={4} key={index} >
                        <SkeletonCard />
                    </Grid>
                )) :
                    solversArray.length > 0 ? solversArray.map(solver =>
                        <Grid item md={4} key={solver.metadata.name} >
                            <SolverCard element={solver} />
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> No solver requests have been made in this Node.</Typography>

                    </Grid>
            }

        </Grid>
    </>
    )

}
