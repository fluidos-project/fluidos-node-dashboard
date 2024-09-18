import { Card, Typography, CardContent, Button, Box, CardActions, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from "@mui/material"
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs"
import calculateAge from "../utils/age";
import { K8SliceType } from "./FlavorType/K8SliceType";
import API from "../utils/API";



export default function FlavorCard(props) {
    const [flavorSection, setFlavorSection] = useState('');
    const navigate = useNavigate();

    const age = calculateAge(props.element.metadata.creationTimestamp)

    // for future updates to support other flavorType
    const specs = () => {
        switch (props.element.spec.flavorType.typeIdentifier) {
            case 'K8Slice':
                return <K8SliceType element={props.element} />;
            default:
                return <p>Specs table has to be implemented for this FlavorType</p>;
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
            <CardActions sx={{ display: 'flex', justifyContent: 'left' }}>
                <Button
                    component={Link}
                    relative="path"
                    size="medium"
                    variant="contained"
                    to={flavorSection == "available" ? props.peeringcandidate.metadata.name : props.element.metadata.name}
                >
                    More Info
                </Button>
                {flavorSection == "local" &&
                    <Button
                        onClick={()=>props.handleDelete(props.idx, props.element.metadata.name)}
                        relative="path"
                        size="medium"
                        variant="contained"
                        color="error"
                    >
                        Delete
                    </Button>}

            </CardActions>
        </Card>
    )
}
