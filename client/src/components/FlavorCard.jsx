import { Card, Typography, CardContent, Button, Box, CardActions, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from "@mui/material"
import { useState } from "react";
import { styled } from '@mui/material/styles';
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs"

export default function FlavorCard(props) {

    const creationDate = dayjs(props.element.metadata.creationTimestamp);

    // Calcola la differenza in giorni
    const differenceInDays = dayjs().diff(creationDate, 'day');


    //console.log(props.element)

    const specs = () => {
        switch (props.element.spec.flavorType.typeIdentifier) {
            case 'K8Slice':
                return <K8SliceType element={props.element} />;
            default:
                return <p>Unknown Type</p>;
        }
    }


    return (
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                <Typography variant="body1" component="div">
                    Name: {props.element.metadata.name}
                </Typography>
                <Typography component="div"sx={{ mb: 1.5 }} color="text.secondary">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Type: {props.element.spec.flavorType.typeIdentifier}</span>
                        <span>AGE: {differenceInDays} {differenceInDays === 1 ? "day" : "days"}</span>
                    </Box>
                </Typography>

                {props.element.spec.availability ? <Typography color="green" sx={{ mb: 1.5 }}> Available </Typography> : <Typography sx={{ mb: 1.5 }} color="red"> Not Available </Typography>}
                {specs()}



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
    )
}

function K8SliceType(props) {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Architecture</TableCell>
                        <TableCell>CPU</TableCell>
                        <TableCell >GPU</TableCell>
                        <TableCell >Memory</TableCell>
                        <TableCell >Pods</TableCell>
                        <TableCell >Storage</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>{props.element.spec.flavorType.typeData.characteristics.architecture}</TableCell>
                        <TableCell>{props.element.spec.flavorType.typeData.characteristics.cpu}</TableCell>
                        <TableCell>{props.element.spec.flavorType.typeData.characteristics.gpu.model ? props.element.spec.flavorType.typeData.characteristics.gpu.model : "-"}</TableCell>
                        <TableCell>{props.element.spec.flavorType.typeData.characteristics.memory}</TableCell>
                        <TableCell>{props.element.spec.flavorType.typeData.characteristics.pods}</TableCell>
                        <TableCell>{props.element.spec.flavorType.typeData.characteristics.storage}</TableCell>

                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}