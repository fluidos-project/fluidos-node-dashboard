import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import calculateAge from "../utils/age";
import { K8SliceType } from "./FlavorType/K8SliceType";


export function PeeringCadidateCard(props) {

    const age = calculateAge(props.element.metadata.creationTimestamp)

    //console.log(props.element)

    //for future updates to support other flavorType
    const details = () => {
        switch (props.element.spec.flavor.spec.flavorType.typeIdentifier) {
            case 'K8Slice':
                return <K8SliceType element={props.element.spec.flavor} />;
            default:
                return <p>Unknown Type</p>;
        }
    }

    return (
        <>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="body1" component="div" >
                        Name: {props.element.metadata.name}
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Type of Candidate: {props.element.spec.flavor.spec.flavorType.typeIdentifier}</span>
                            <span>AGE: {age}</span>
                        </Box>
                    </Typography>
                    {props.element.spec.available ? <Typography color="green" sx={{ mb: 1.5 }}> Available </Typography> : <Typography sx={{ mb: 1.5 }} color="red"> Not Available </Typography>}
                    
                    <Typography variant="body1" component="div" sx={{ mb: 1.5 }} >
                        Associated Flavor : {props.element.spec.flavor.metadata.name}
                    </Typography>
                    {details()}

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