import { Card, Typography, CardContent, Button, Box, CardActions, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from "@mui/material"
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import React from "react";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs"
import calculateAge from "../utils/age";
import { K8SliceType } from "./FlavorType/K8SliceType";


export default function FlavorCard(props) {
    const [flavorSection, setFlavorSection] = useState("local");

    const age = calculateAge(props.element.metadata.creationTimestamp)

    // for future updates to support other flavorType
    const specs = () => {
        switch (props.element.spec.flavorType.typeIdentifier) {
            case 'K8Slice':
                return <K8SliceType element={props.element} />;
            default:
                return <p>Unknown Type</p>;
        }
    }

    useEffect(() => {
        const updateSection = () => {
            const pathnames = location.pathname.split('/').filter(x => x);
            const lastPathSegment = pathnames[pathnames.length - 1];

            if (lastPathSegment === "available") {
                setFlavorSection("available");
            } else if (lastPathSegment === "acquired") {
                setFlavorSection("acquired");
            } else {
                setFlavorSection("local");
            }
           
        };

        updateSection();
    });


    return (
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Typography variant="body1" component="div">
                    Name: {props.element.metadata.name}
                </Typography>
                <Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Type: {props.element.spec.flavorType.typeIdentifier}</span>

                    </Box>
                </Typography>

                {flavorSection !== "local" &&
                    <Typography variant="body1" component="div">
                        Fluidos Node ID: {`${props.element.spec.owner.nodeID} (${props.element.spec.owner.ip})`}
                    </Typography>

                }

                {flavorSection == "local" &&
                    (props.element.spec.availability ? <Typography color="green" sx={{ mb: 1.5 }}> Available </Typography> : <Typography sx={{ mb: 1.5 }} color="red"> Not Available </Typography>)
                }
                {flavorSection == "acquired" &&
                    (props.element.spec.availability ? <Typography color="green" sx={{ mb: 1.5 }}> Active </Typography> : <Typography sx={{ mb: 1.5 }} color="red"> Not Active </Typography>)
                }

                {specs()}

            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    component={Link}
                    relative="path"
                    size="medium"
                    variant="contained"
                    to={flavorSection=="available"? props.peeringcandidate.metadata.name: props.element.metadata.name}
                >
                    More Info
                </Button>

            </CardActions>
        </Card>
    )
}
