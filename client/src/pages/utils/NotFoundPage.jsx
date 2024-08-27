import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';

export function NotFoundPage() {

    return (<>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                padding: 2
            }}
        >
           <SentimentVeryDissatisfiedOutlinedIcon sx={{ fontSize: 100, color: '#ff6f61'}}/>
            <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 'bold', color: '#ff6f61' }}>
                404
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Oops! We can't find the page you're looking for.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                It seems like this page has gone missing or never existed in the first place.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                sx={{ textTransform: 'none', fontSize: '1.2rem' }}
            >
                Take Me Home
            </Button>
        </Box>
    </>
    )

}
