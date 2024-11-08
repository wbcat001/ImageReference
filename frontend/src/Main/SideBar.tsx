import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link as RouterLink} from "react-router-dom";
import { styled } from '@mui/material';




const SideBar:React.FC =  () => {

    const MenuItem = [
        {link: "/", text: "Home"},
        {link: "/Search", text: "Search"},
        {link: "/SignIn", text: "Login"},
        {link: "/MyList", text: "MyList"},
        {link: "/Analy", text: "Analy"}
    ]

    const [open, setOpen] = React.useState(true);

    const toggleDrawer = (newOpen: boolean) => () => {
      setOpen(newOpen);
    };
    return (
    <div>
  
      {/* <Toolbar /> */}
      
     
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }} role="presentation">
        <IconButton color="primary" aria-label="home">
        <img src="/icon.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
        
        </IconButton>
      </Box>
      
      <Divider />
      <List>
        {MenuItem.map((item, index) => (
          <SideBarLine>
          <ListItem key={item.text} disablePadding component={RouterLink} to={item.link}>
            <ListItemButton >
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
              <ListItemText primary={item.text} sx={{ color: '#dd4444' }}/>
            </ListItemButton>
          </ListItem>
          </SideBarLine>  
        ))}
      </List>
      
     
       
      

    </div>
    )
};

const SideBarLine = styled(Box)(({ theme }) => ({
          // Adjust width as needed
 
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '1px',         // Line thickness
    width: '0%',           // Start with 0% width
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.4s ease-in-out',  // Animation duration and ease
  },
  '&:hover::after': {
    width: '100%',         // Expand to full width on hover
  },
}));

export default SideBar;