import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
       
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Fluidos Node Dashboard
        </Typography>

        <Button color="inherit" component={Link} to="/info">
          Nodes Info
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header