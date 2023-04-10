import React, { useState, useEffect, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, Box, Tooltip, TextField, DialogActions, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import userContext from '../context/users/userContext';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';
import { postData } from '../api/serverServices';
//translate
import { useTranslation } from '../Translate/i18n';

const UserDashboard = () => {

  //Translate 
  const { t } = useTranslation();

  //States
  //states for Menu of Options and Menu of User
  const [Nav, setNav] = useState(null);
  const [User, setUser] = useState(null);
  //state to store user data
  const [data, setData] = useState({})
  //State of feedback
  const [openfeedbackWindow, setOpenFeedbackWindow] = useState(false)
  const [message, setMesage] = useState('')
  const [email, setEmail] = useState('')
  const [star, setStar] = useState('')
  const [name, setName] = useState('')

  //open close state of options
  const handleOpenNavMenu = (e) => {
    //It allows to determine the source of an e, and can be useful in scenarios where the same e handler is attached to multiple elements.
    setNav(e.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setNav(null);
  };

  // open close state of Setting
  const handleOpenUserMenu = (e) => {
    setUser(e.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setUser(null);
  };

  //navigate function
  const navigate = useNavigate();

  //logout function
  const logout = () => {
    setEmail(JSON.parse(localStorage.getItem('data')).email)
    setName(JSON.parse(localStorage.getItem('data')).firstname)

    handleOpenFeedbackWindow()

    //remove token from localstorage
    localStorage.clear()
    // localStorage.removeItem('token');
    // localStorage.removeItem('data');

  }

  //get img url
  const context = useContext(userContext);
  const { imgurl, setImgUrl, setAge } = context

  useEffect(() => {
    try {
      //check if localstorage already has token and set data of user
      const isLoggedIn = () => {
        localStorage.getItem("token") === null && navigate("/");
      }
      isLoggedIn();
      setData(JSON.parse(localStorage.getItem('data')))                          //set data 
      setImgUrl(JSON.parse(localStorage.getItem('data'))?.userprofilepic)        //set image url in UI
      //AGE CALCULATOR
      const CalculateAge = () => {
        //get today date
        const today = new Date();
        //convert DOB into same format
        const birthDate = new Date(JSON.parse(localStorage.getItem("data"))?.dateofbirth);
        //diff of current year and  dob year
        let age = today.getFullYear() - birthDate.getFullYear();
        //diff of current month and dob month
        const monthDiff = today.getMonth() - birthDate.getMonth();

        //(Negative age) if monthdiff is less than 0 or birth date is greater than today date and monthdiff is equal to zero
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        setAge(age);
        return age;
      }
      CalculateAge()                                                            //calculate age
    }
    catch (error) {
      console.log(error)
    }
  }, [navigate, setAge, setImgUrl])


  //Feedback onchange
  const handleOpenFeedbackWindow = () => {

    setOpenFeedbackWindow(true)
  }

  const handleCloseFeedbackWindow = async () => {

    if (message.length >= 1) {
      let response = await postData('addfeedback', { subject: [{ subject: " ", message: message }], email: email, star: star, message: message, name: name })
      console.log(response);
      if (response.status) {
        Swal.fire('feedback added', '', 'success')
      }
      else {
        Swal.fire('error', '', 'error')
      }
    }

    setOpenFeedbackWindow(false)
    navigate('/')
  }


  return (
    <div className='start' style={{ position: "fixed", width: "100%", zIndex: "100", top: "0" }}>
      {/* by default its position is fixed  */}
      <AppBar position='static' sx={{ width: '100%' }}>
        {/*it add some padding from right and left side*/}
        <Toolbar size="large" edge="start" color='inherit' aria-label="Praedico">
          {/*Added to click on Icon*/}
          <IconButton sx={{ display: { xs: 'none', md: 'flex' } }} onClick={() => navigate("/User/")}>
            {/*Imported Icon*/}
            <HomeIcon sx={{ width: "30px", height: "30px" }} color="secondary" />
          </IconButton>

          {/*Typography is used to add some text (sx - it is shortcut for style in material UI inside it we can give any style) flexgrow - it specifies how much the item will grow relative to the rest of the flexible items inside the same container*/}

          {/*here extrasmall is none and medium is flex so when screen grow display desktop version or Hidden only on xs*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'end' } }} >
            <Typography onClick={() => navigate("/User/Gst")} variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} color="secondary">{t("gst")}</Typography >
            <Typography onClick={() => navigate("/User/Calculator")} variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} color="secondary">{t("calculator")}</Typography >
            <Typography onClick={() => navigate("/User/Expense")} variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} color="secondary">{t("Expenditure")}</Typography >
            <Typography onClick={() => navigate("/User/Advisory")} variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} color="secondary">{t("Advisory")}</Typography >
            <Typography onClick={() => navigate("/User/Contact")} variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} color="secondary">{t("contact")}</Typography >
            <Typography onClick={() => navigate("/User/About")} variant="h6" component="div" sx={{ mr: 4 }} style={{ cursor: 'pointer' }} color="secondary">{t("About")}</Typography >
          </Box>

          {/*here extrasmall is flex and medium is none so when screen shrink and display Menu ICON or Hidden only on md*/}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/*Added to click on Icon*/}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              <MenuItem color='inherit' onClick={() => { navigate("/User/"); handleCloseNavMenu() }}>{t("Home")}</MenuItem>
              <MenuItem color='inherit' onClick={() => { navigate("/User/Gst"); handleCloseNavMenu() }}>{t("gst")}</MenuItem>
              <MenuItem color='inherit' onClick={() => { navigate("/User/Calculator"); handleCloseNavMenu() }}>{t("calculator")}</MenuItem>
              <MenuItem color='inherit' onClick={() => { navigate("/User/Expense"); handleCloseNavMenu() }}>{t("Expenditure")}</MenuItem>
              <MenuItem color='inherit' onClick={() => { navigate("/User/Advisory"); handleCloseNavMenu() }}>{t("Advisory")}</MenuItem>
              <MenuItem color='inherit' onClick={() => { navigate("/User/Contact"); handleCloseNavMenu() }}>{t("contact")}</MenuItem>
              <MenuItem color='inherit' onClick={() => { navigate("/User/About"); handleCloseNavMenu() }}>{t("About")}</MenuItem>
            </Menu>
          </Box>

          {/*Setting Box when click open menu - it can also be done by using onclick method(with every click change state to open and close)*/}
          <Box sx={{ flexGrow: 0 }}>
            {/*to give a extra information when hover*/}
            <Tooltip title="settings">
              <IconButton onClick={handleOpenUserMenu} >
                {/*display image of user   src={data.userprofilepic}*/}
                <img style={{ borderRadius: "50%", objectFit: "cover", width: " 50px", height: "50px", cursor: "pointer" }} alt={`${data.firstname} ${data.lastname}`} src={imgurl} />
              </IconButton>
            </Tooltip>

            {/*To create a menu we need menu and menu Item*/}
            <Menu
              //save state in anchorEl
              anchorEl={User}
              //if anchorEl is true than open Menu
              open={Boolean(User)}
              //it is used to close the menu
              onClose={handleCloseUserMenu}
            >
              <MenuItem color='inherit' onClick={() => {
                navigate("/User/Profile");
                handleCloseUserMenu()
              }}>Profile</MenuItem>
              <MenuItem color='inherit' onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>

      {/*dialog of feedback*/}
      <Dialog
        open={openfeedbackWindow}

        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Feedback")}
        </DialogTitle>
        <DialogContent>
          <div>
            <Rating name="half-rating" onChange={(e) => setStar(e.target.value)} precision={0.5} required />
            <br />
            <TextField fullWidth variant='outlined' onChange={(e) => setMesage(e.target.value)} required></TextField>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenFeedbackWindow(false); navigate('/') }}>{t("skip")}</Button>
          <Button onClick={handleCloseFeedbackWindow} autoFocus>{t("Submit")}</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default UserDashboard