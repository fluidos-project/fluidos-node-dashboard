import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom";
import calculateAge from "../utils/age";


export function SolverCard(props) {

    const age = calculateAge(props.element.metadata.creationTimestamp)


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
                            <span>{props.element.spec.selector.flavorType === '' ? "Solver without FlavorType filter": `Flavor Type: ${props.element.spec.selector.flavorType}` }</span>
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
                                   {props.element.status.findCandidate}
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