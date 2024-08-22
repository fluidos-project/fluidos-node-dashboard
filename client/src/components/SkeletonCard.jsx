import { Skeleton, Card, Button, Typography, CardActions, CardContent } from "@mui/material"
import { Box } from "@mui/system"


export function SkeletonCard() {
    return (
        <>
        
        <Card sx={{ minWidth: 300 }}>
            <CardContent>
                
                <Typography variant="body1" component="div">
                    <Skeleton width="60%" />
                </Typography>

                
                <Typography component="div" sx={{ mb: 1.5 }} color="text.secondary">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Skeleton width="40%" />
                        <Skeleton width="20%" />
                    </Box>
                </Typography>

                
                <Skeleton width="40%" sx={{ mb: 1.5 }} />

                
                <Skeleton variant="rectangular" width={350} height={100} />
                <Skeleton width="60%" />
            </CardContent>

            {/* Skeleton for the Button */}
            <CardActions>
                <Skeleton variant="rectangular" width={100} height={36} />
            </CardActions>
        </Card>

        </>
    )
}