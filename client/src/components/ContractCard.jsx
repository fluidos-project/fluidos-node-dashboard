import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Link } from "react-router-dom";
import calculateAge from "../utils/age";
import dayjs from "dayjs";


export function ContractCard(props) {

    const age = calculateAge(props.element.metadata.creationTimestamp)

    //console.log(props.element)

    return (
        <>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="body1"  component="div" >
                        Name: {props.element.metadata.name}
                    </Typography>

                    {new dayjs(props.element.spec.expirationTime) < new dayjs() ? <Typography color="green" sx={{ mb: 1.5 }}> Not Expired </Typography> : <Typography sx={{ mb: 1.5 }} color="red"> EXPIRED </Typography>}
                    
                    <Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Expiration Date: {new dayjs(props.element.spec.expirationTime).toString()} </span>
                            <span>AGE: {age}</span>
                        </Box>
                    </Typography>
                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            Flavor Bought: {props.element.spec.flavor.metadata.name}
                        </Box>
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           Transaction ID:{props.element.spec.transactionID}
                        </Box>
                    </Typography>

                    <Typography component="div" sx={{ mb: 1.5 }} color="text.primary">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           Seller: {`${props.element.spec.seller.nodeID} (${props.element.spec.seller.ip})`}
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