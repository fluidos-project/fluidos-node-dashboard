import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom";
import calculateAge from "../utils/age";


export function AllocationCard(props) {

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
                        {props.element.status.message}
                    </Typography>
                    
                    <Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Intent ID: {props.element.spec.intentID}</span>
                            <span>AGE: {age}</span>
                        </Box>
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Allocation Status:
                            {props.element.status.status === 'Active' ? (
                                <Typography color="green" sx={{ ml: 1 }}>
                                    Active
                                </Typography>
                            ) : (
                                <Typography color="red" sx={{ ml: 1 }}>
                                    Not Active
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