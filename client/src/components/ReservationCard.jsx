import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom";
import calculateAge from "../utils/age";
import dayjs from "dayjs";


export function ReservationCard(props) {

    const age = calculateAge(props.element.metadata.creationTimestamp)

    //console.log(props.element)

    return (
        <>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="body1" component="div" >
                        Name: {props.element.metadata.name}
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Resource Reserved: {props.element.spec.configuration.type}</span>
                            <span>AGE: {age}</span>
                        </Box>
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                           Solver Request ID: {props.element.spec.solverID}
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Reserving Status:
                            {props.element.spec.reserve ? (
                                <Typography color="green" sx={{ ml: 1 }}>
                                    Reservation Successful
                                </Typography>
                            ) : (
                                <Typography color="red" sx={{ ml: 1 }}>
                                   Reservation Not successful
                                </Typography>
                            )}
                        </Box>
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Purchasing Status:
                            {props.element.spec.purchase ? (
                                <Typography color="green" sx={{ ml: 1 }}>
                                    Correctly Purchased
                                </Typography>
                            ) : (
                                <Typography color="red" sx={{ ml: 1 }}>
                                   Error
                                </Typography>
                            )}
                        </Box>
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button
                        component={Link}
                        relative="path"
                        size="medium"
                        variant="contained"
                        to={props.element.metadata.name}
                    >
                        More Info
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}