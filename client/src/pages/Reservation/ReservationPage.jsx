import { useEffect, useState } from "react";
import API from "../../utils/API";
import { Grid, Typography } from "@mui/material";
import { SkeletonCard } from "../../components/SkeletonCard";
import { ReservationCard } from "../../components/ReservationCard";

export function ReservationPage(props){

    const [reservationsArray, setReservationsArray] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const fetchReservations = async () => {
            try {
                const reservations = await API.getReservations();
                
                setReservationsArray(reservations);
                setIsLoading(false);
            } catch (error) {
                console.log(error)
                props.configureAlert({ type: "error", message: error })
            }
        }

        fetchReservations();

    }, [])

    return (<>
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Typography variant="h3"> Reservations</Typography>
            </Grid>
            {
                isLoading ? [...Array(6)].map((_, index) => (
                    <Grid item md={4} key={index} >
                        <SkeletonCard />
                    </Grid>
                )) :
                    reservationsArray.length > 0 ? reservationsArray.map(reservation =>
                        <Grid item md={4} key={reservation.metadata.name} >
                            <ReservationCard element={reservation} />
                        </Grid>
                    ) : <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} >
                        <Typography variant="h5"> No Reservations available at the moment.</Typography>

                    </Grid>
            }

        </Grid>
    </>
    )

}