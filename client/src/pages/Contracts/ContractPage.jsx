import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Grid, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/SkeletonCard";
import { PeeringCadidateCard } from "../../components/PeeringCandidatesCard";
import { ContractCard } from "../../components/ContractCard";

export function ContractPage() {

    const [contractsArray, setContractsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchContracts = async () => {
            try {
                const contracts = await API.getContracts();

                setContractsArray(contracts);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchContracts();

    }, [])

    return (<>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant="h3"> Contracts</Typography>
            </Grid>
            {
                isLoading ? [...Array(6)].map((_, index) => (
                    <Grid item md={4} key={index} >
                        <SkeletonCard />
                    </Grid>
                )) :
                    contractsArray.length > 0 ? contractsArray.map(contract =>
                        <Grid item md={4} key={contract.metadata.name} >
                            <ContractCard element={contract} />
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> No Contracts available at the moment.</Typography>

                    </Grid>
            }

        </Grid>
    </>
    )


}
