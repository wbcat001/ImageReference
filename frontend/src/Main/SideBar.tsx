import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
import {Link} from "react-router-dom";




const SideBar:React.FC =  () => {

    const MenuItem = [
        {link: "/", text: "Home"},
        {link: "/Search", text: "Search"},
    ]
    return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {MenuItem.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <Link to={item.link}>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              <ListItemText primary={item.text} />
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      
    </div>
    )
};


export default SideBar;