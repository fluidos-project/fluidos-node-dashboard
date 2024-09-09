import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Grid, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/SkeletonCard";
import { TransactionCard } from "../../components/TransactionCard";
import InfoIcon from '@mui/icons-material/Info';

export function TransactionPage(props){

    const [transactionsArray, setTransactionsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchTransactions = async () => {
            try {
                const transactions = await API.getTransactions();
                
                setTransactionsArray(transactions);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchTransactions();

    }, [])

    return (<>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant="h3"> Transactions</Typography>
            </Grid>
            <Grid item md={12}>
                <Typography variant="body1"> <InfoIcon fontSize="small" color="primary" /> Transaction are intermediate resources that links reservations with purchase </Typography>
            </Grid>
            {
                isLoading ? [...Array(6)].map((_, index) => (
                    <Grid item md={12} key={index} >
                        <SkeletonCard />
                    </Grid>
                )) :
                    transactionsArray.length > 0 ? transactionsArray.map(transaction =>
                        <Grid item md={12} key={transaction.metadata.name} >
                            <TransactionCard element={transaction} />
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> No Transactions available at the moment.</Typography>

                    </Grid>
            }

        </Grid>
    </>
    )

}
