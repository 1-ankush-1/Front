import React, { useState } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Grid, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import ServiceModal from './ServiceModal';
import HomeIcon from '@mui/icons-material/Home';
//translate
import { useTranslation } from '../../../Translate/i18n';


export default function Nav() {

    //Translate 
    const { t } = useTranslation();

    //state for dialog box of services
    const [service, setOpenService] = useState(false);
    //states for Menu of Options and Menu of User
    const [Nav, setNav] = useState(null);

    //open and close service model
    const serviceOpen = () => {
        setOpenService(true);
    };

    const serviceClose = () => {
        setOpenService(false);
    };

    //open close Menu
    const handleMenu = (e) => {
        //It allows to determine the source of an e, and can be useful in scenarios where the same e handler is attached to multiple elements.
        setNav(e.currentTarget);
    };
    const handleCloseMenu = () => {
        setNav(null);
    };

    const navigate = useNavigate();

    return (
        <Box style={{ position: "fixed", width: "100%", zIndex: "100", top: "0" }}>
            <AppBar position="static" sx={{  display: "flex" }}>
                <Toolbar  >
                    {/*when screen is small show TEXT*/}

                    <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} onClick={() => navigate("/")}>
                        {/*Imported Icon*/}
                        <HomeIcon sx={{width:"30px" ,height:"30px"}} color="secondary"/>
                        
                    </IconButton>

                    {/*show navbar item in Menu small screen */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1 }} >
                        {/*Added to click on Icon*/}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            {/*Imported Icon*/}
                            <MenuIcon color="secondary"/>
                        </IconButton>

                        {/*show in small screen*/}
                        <Menu
                            //save state in anchorEl
                            anchorEl={Nav}
                            //if anchorEl is true than open Menu
                            open={Boolean(Nav)}
                            //it is used to close the menu
                            onClose={handleCloseMenu}
                        >
                             <MenuItem onClick={() => { navigate("/"); handleCloseMenu() }}>{t("Home")}</MenuItem>
                            <MenuItem  onClick={() => { serviceOpen(); handleCloseMenu() }} >{t("services")}</MenuItem>
                            <MenuItem onClick={() => { navigate("/Contact"); handleCloseMenu() }}>{t("contact")}</MenuItem>
                            <MenuItem  onClick={() => { navigate("/About"); handleCloseMenu() }}>{t("About")}</MenuItem>
                        </Menu>
                    </Box>

                    {/*show navbar item on large screen */}
                    <Grid container={true} direction="row" sx={{ display: { xs: 'none', md: 'flex', justifyContent: "end" } }}>
                        <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={serviceOpen} color="secondary" >
                        {t("services")}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("Contact")} color="secondary">
                        {t("contact")}
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} onClick={() => navigate("About")} color="secondary">
                        {t("About")}
                        </Typography>
                    </Grid>

                    {/*when screen is small show TEXT (this is in center because of flexgrow)*/}
                    {/* <Typography sx={{ display: { xs: "flex", md: "none" }, flexGrow: 0.5 }} variant="h4" component="div" onClick={() => navigate("/")} ><a style={{cursor:"pointer"}}><img src="/images/home.png" alt="VCA" width="40" height="40" /></a></Typography> */}

                    {/*login page icon from here*/}

                    <ServiceModal props={true} service={service} serviceOpen={serviceOpen} serviceClose={serviceClose} />

                </Toolbar>
            </AppBar>
        </Box>
    );
}