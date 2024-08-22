import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import calculateAge from "../utils/age";


export function SolverCard(props) {

    const age = calculateAge(props.element.metadata.creationTimestamp)

    //console.log(props.element)

    return (
        <>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="body1"  component="div" >
                        Name: {props.element.metadata.name}
                    </Typography>
                    <Typography variant="body1"component="div" color="blue">
                        {props.element.status.solverPhase.message}
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Flavor Type: {props.element.spec.selector.flavorType}</span>
                            <span>AGE: {age}</span>
                        </Box>
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Candidate Phase:
                            {props.element.status.findCandidate === 'Solved' ? (
                                <Typography color="green" sx={{ ml: 1 }}>
                                    Solved
                                </Typography>
                            ) : (
                                <Typography color="red" sx={{ ml: 1 }}>
                                    Not Established
                                </Typography>
                            )}
                        </Box>
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Reserving Phase:
                            {props.element.status.reserveAndBuy === 'Solved' ? (
                                <Typography color="green" sx={{ ml: 1 }}>
                                    Solved
                                </Typography>
                            ) : (
                                <Typography color="red" sx={{ ml: 1 }}>
                                    Not Established
                                </Typography>
                            )}
                        </Box>
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Peering Phase:
                            {props.element.status.peering === 'Solved' ? (
                                <Typography color="green" sx={{ ml: 1 }}>
                                    Solved
                                </Typography>
                            ) : (
                                <Typography color="red" sx={{ ml: 1 }}>
                                    Not Established
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