import { Card, Typography, CardContent, Button, Box, CardActions, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from "@mui/material"

export function K8SliceType(props) {
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