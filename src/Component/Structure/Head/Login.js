import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { postData } from '../../../api/serverServices';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Swal from 'sweetalert2';
import { SocialLogin } from './SocialLogin';
//translate
import { useTranslation } from '../../../Translate/i18n';
import FreezeScreen from './Freeze';

export default function Dialoglogin({ props, login, loginOpen, loginClose }) {

    //Translate 
    const { t } = useTranslation();

    //initilize usenavigate with useNavigate
    const navigate = useNavigate();
    const gotoRegister = () => {
        navigate('/Register')
        loginClose();
    }

    //the dialog box is opened or not
    const [openforgotwindow, setopnforgotwindow] = useState(false)
    const [mobilenumber, setmobilenumber] = useState(null)


    //forget click handler
    const handleOpenForgotWindow = () => {
        setopnforgotwindow(true)
        loginClose();
    }

    const handleCloseForgotWindow = () => {
        setopnforgotwindow(false)
    }

    //function calls post request to get the password on the registered mail id
    const sendPassword = async () => {
        let body = { mobilenumber: mobilenumber }
        let response = await postData('getforgotpassword', body)

        if (response.status) {
            setopnforgotwindow(false)
            Swal.fire(t("passsend"), '', 'success')
        }
        else {
            Swal.fire(t("Error"))
        }
    }

    //user data
    const [inpval, setINP] = useState({
        email: "",
        password: ""
    })

    // onchange value of each field
    const setdata = (e) => {

        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })

    }

    // called when login button is clicked
    const checkUser = async (e) => {

        loginClose();//to close the dialog box
        //postdata func from ../../api/serverServices is called
        await postData("checkuser", inpval).then((res) => {
            if (res.status) {

                //here token will be stored in localstorage                           
                localStorage.setItem("token", res.token)
                //testing

                //storing data in localstorage because when we send data through navigate if someone manually refresh the page the date will get deleted
                localStorage.setItem("data", JSON.stringify(res.data))
                SetFreezeWindow(true)
            }
            else {
                Swal.fire(t("Error"))
            }
        });
    }

    //freeze window
    const [freezeWindow, SetFreezeWindow] = useState(false)

    return (

        <div>
            <IconButton sx={props ? { display: 'flex', justifyContent: "end" } : { display: "none" }} onClick={loginOpen}>
                <PersonIcon color="secondary" />
            </IconButton>

            <Dialog open={login} onClose={loginClose} >
                <DialogTitle variant='h5' align="center">{t("login")}</DialogTitle>
                <DialogContent>
                    <hr />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={t("Email")}
                        type="email"
                        fullWidth
                        variant="standard"
                        name='email'
                        value={inpval.email}
                        onChange={setdata}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        name='password'
                        label={t("pass")}
                        type="password"
                        fullWidth
                        variant="standard"
                        value={inpval.password}
                        onChange={setdata}
                    />
                    {/* <Button onClick={handleClose}>Cancel</Button> */}
                    <DialogContentText style={{ marginTop: '5px' }} color="text.primary">{t("Having_Trouble")}<Button onClick={handleOpenForgotWindow}>{t("Forget")}</Button></DialogContentText>
                    {/* onclick button calls checuser */}
                    <Button style={{ marginTop: '30px' }} onClick={checkUser} variant="contained" fullWidth >{t("login")}</Button>
                </DialogContent>

                {/* {/mid line/} */}
                <DialogContentText align="center" color="text.primary">— Or Sign in with —</DialogContentText>

                {/* {/Social media login/} */}

                <div style={{ textAlign: 'center', padding: 8 }}>
                    <Button ><SocialLogin /></Button>
                </div>

                {/* {/go to register Page/} */}
                <DialogContentText align="center" color="text.primary">{t("dont_have_account")}<Button onClick={gotoRegister} style={{ fontWeight: 'bold' }} >{t("signup")}</Button></DialogContentText>

            </Dialog>


            <Dialog open={openforgotwindow} onClose={handleCloseForgotWindow}>
                <DialogTitle>{t("Forget")}</DialogTitle>
                <DialogContent>
                    <DialogContentText text-style>
                        {t("Enter_regis_mobile_no")}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={t("phone")}
                        type="number"
                        fullWidth
                        variant="standard"
                        name='mobilenumber'
                        onChange={(event) => setmobilenumber(event.target.value)}
                    />
                    {/* onclick button calls checuser */}
                    <Button type="type" style={{ marginTop: '30px' }} onClick={sendPassword} variant="contained" fullWidth >{t("Submit")}</Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseForgotWindow}>{t("Cancel")}</Button>
                </DialogActions>
            </Dialog>

            {/*FreezeScreen Dialog*/}
            <FreezeScreen freezeWindow={freezeWindow} SetFreezeWindow={SetFreezeWindow}/>

        </div>

    );

}
