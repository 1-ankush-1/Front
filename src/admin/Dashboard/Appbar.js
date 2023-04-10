import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Logout from './logout';
import AddAdmin from './addadmin';
import HomeIcon from '@mui/icons-material/Home';


function ResponsiveAppBar() {

  const [Nav, setNav] = useState(null);
  const navigate = useNavigate();

  //open close state of options
  const handleOpenNavMenu = (e) => {
    //It allows to determine the source of an e, and can be useful in scenarios where the same e handler is attached to multiple elements.
    setNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setNav(null);
  };

  return (

    <div className='start' style={{ position: "fixed", width: "100%", zIndex: "100", top: "0" }}>
      {/* by default its position is fixed  */}
      <AppBar position='static' sx={{ width: '100%' }}>
        {/*it add some padding from right and left side*/}
        <Toolbar size="large" edge="start" color='inherit' aria-label="Praedico">
          {/*Added to click on Icon*/}
          <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} href='/'>
            {/*Imported Icon*/}
            <HomeIcon sx={{ width: "30px", height: "30px" }} color="secondary" />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'end' } }} >
            <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("/admin/dash")}  >Users </Typography>
            <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("gst")}  >GST</Typography>
            <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("feedback")}  >Feedback</Typography>
            <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("admin")}  >Admins</Typography>
            <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("stocks")}  >Stocks</Typography>
            <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("funds")}  >Funds</Typography>
            <AddAdmin />
            <Logout />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'end' } }}>
            {/*Added to click on Icon*/}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}

            >
              {/*Imported Icon*/}
              <MenuIcon color="secondary" />
            </IconButton>

            {/*To create a menu we need menu and menu Item*/}
            <Menu
              //save state in anchorEl
              anchorEl={Nav}
              //if anchorEl is true than open Menu
              open={Boolean(Nav)}
              //it is used to close the menu
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={() => {navigate("/admin/dash"); handleCloseNavMenu() }} >Users</MenuItem>
              <MenuItem onClick={() => {navigate("admin");handleCloseNavMenu() }}>Feedback</MenuItem>
              <MenuItem onClick={() => {navigate("gst");handleCloseNavMenu() }}>GST</MenuItem>
              <MenuItem onClick={() => {navigate("feedback");handleCloseNavMenu() }}>Feedback</MenuItem>
              <MenuItem onClick={() => {navigate("stocks");handleCloseNavMenu() }}>Stocks</MenuItem>
              <MenuItem onClick={() => {navigate("funds");handleCloseNavMenu() }}>Funds</MenuItem>
              <MenuItem ><AddAdmin /></MenuItem>
              <MenuItem ><Logout /></MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
