// Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
    return (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
              mt: 9,
            },
          }}
        >
          <List>
          <ListItem
              button
              component={NavLink}
              to="/"
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', // BG color active element
                },
              }}
            >
              <ListItemText primary="Overview" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/flavors"
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', // BG color active element
                },
              }}
            >
              <ListItemText primary="Flavors" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/solvers"
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', 
                },
              }}
            >
              <ListItemText primary="Solvers" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/reservations"
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', 
                },
              }}
            >
              <ListItemText primary="Reservations" />
            </ListItem>

            <ListItem
              button
              component={NavLink}
              to="/transactions"
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', 
                },
              }}
            >
              <ListItemText primary="Transactions" />
            </ListItem>
    
            <ListItem
              button
              component={NavLink}
              to="/contracts"
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', 
                },
              }}
            >
              <ListItemText primary="Contracts" />
            </ListItem>
            
            <ListItem
              button
              component={NavLink}
              to="/allocations"
              sx={{
                '&.active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)', 
                },
              }}
            >
              <ListItemText primary="Allocations" />
            </ListItem>

            

          </List>
        </Drawer>
      );
};

export default Sidebar;
