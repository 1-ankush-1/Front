import { useState } from 'react'
import { postData } from "../api/serverServices";
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, Input, Grid, Container, TextField, Checkbox,  Link } from '@mui/material';
import Swal from 'sweetalert2';
//translate
import { useTranslation } from '../Translate/i18n';


const Register = () => {

    //Translate 
    const { t } = useTranslation();

    //term and condition state
    const [terms, setterms] = useState(false);
    //user data state
    const [inpval, setINP] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        dob: "",
        contactno: "",
        address: "",
        salary: "",
        repassword: "",
        gender: "",
        otp: "",
        Farmer: ""
    })
    //image state
    const [img, setImg] = useState(null)
    const [imgname, setImgname] = useState(null);
    const [dispImg, setDispImg] = useState(null)

    //onchange of terms and condition
    const termfunc = () => {
        setterms(!terms);
    }

    //onchange of user data
    const setdata = (e) => {
        setINP({ ...inpval, [e.target.name]: e.target.value })
    }

    //onchange of user image
    const imgdata = (e) => {
        console.log(e.target.files[0].name)
        setImgname(e.target.files[0].name)
        setImg(e.target.files[0]);
        setDispImg(URL.createObjectURL(e.target.files[0]));
    }

    //initilised navigate function
    const navigate = useNavigate();

    //called when form is submitted
    const addinpdata = async () => {
        //adding otp value
        inpval.otp = inputValue;

        //storing data in formdata to send  
        const Data = new FormData();

        Data.append('data', JSON.stringify(inpval))
        Data.append('img', img)
        console.log(Data)


        //(API)postdata takes input data and whether it is multipart/form-data or not 
        const check = await postData("adduser", Data, true)

        //if it is true than navigate to login 
        if (check.status) {
            Swal.fire("sign up successfull");
            navigate('/')               //go to firstpage
        }

    }

    //OTP CODE

    //value of otp
    const [inputValue, setInputValue] = useState(null);
    //open close window
    const [otpwindow, setOtpWindow] = useState(false)

    //first request to send otp to email
    const handleOpenOtpWindow = async () => {
        console.log("img", img)

        if (!terms) {
            alert("accept the terms and condition");
        }
        else if (inpval.password !== inpval.repassword) {
            alert("enter the password correctly");
        }
        else {

            //sending otp to backend
            let body = { email: inpval.email }
            let response = await postData('sendotp', body)
            console.log(response)
            if (response.status) {
                //open dialog box
                setOtpWindow(true)
            }
            else {
                Swal.fire(t("Error"))
            }
        }
    }

    //closing dialog box
    const handleCloseOtpWindow = () => {
        setOtpWindow(false)
    }

    return (
        <>

            <div style={{ paddingBottom: "70px" }}>
                <div style={{ paddingTop: "50px" }}>
                    <h2 style={{ textAlign: "center" }}>{t("signup")}</h2>
                </div>
                <Container style={{ paddingTop: "40px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("FName")}
                                placeholder={t("FName")}
                                variant="outlined"
                                fullWidth
                                value={inpval.firstname}
                                onChange={setdata}
                                name="firstname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("LName")}
                                placeholder={t("LName")}
                                variant="outlined"
                                fullWidth
                                value={inpval.lastname}
                                onChange={setdata}
                                name="lastname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("Email")}
                                placeholder={t("Email")}
                                variant="outlined"
                                fullWidth
                                value={inpval.email}
                                onChange={setdata}
                                name="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                placeholder="dd/mm/yy"
                                variant="outlined"
                                fullWidth
                                type="date"
                                value={inpval.dob}
                                onChange={setdata}
                                name="dob"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("pass")}
                                placeholder="***"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={inpval.password}
                                onChange={setdata}
                                name="password"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("RePass")}
                                placeholder="***"
                                variant="outlined"
                                fullWidth
                                type="password"
                                value={inpval.repassword}
                                onChange={setdata}
                                name="repassword"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("phone")}
                                placeholder={t("phone")}
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={inpval.contactno}
                                onChange={setdata}
                                name="contactno"

                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("Addr")}
                                placeholder={t("Addr")}
                                variant="outlined"
                                fullWidth
                                value={inpval.address}
                                onChange={setdata}
                                name="address"
                            />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <TextField
                                label={t("Salary")}
                                placeholder={t("Salary")}
                                variant="outlined"
                                fullWidth
                                type="number"
                                value={inpval.salary}
                                onChange={setdata}
                                name="salary"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl>
                                <FormLabel id="controlled-radio-buttons">{t("Farmer")}</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="Farmer"
                                    onChange={setdata}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label={t("True")} />
                                    <FormControlLabel value={false} control={<Radio />} label={t("False")} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" component="label">{t("img")}
                                <input type="file" onChange={imgdata} hidden />
                            </Button>
                            <img id="target" src={dispImg} height="100px" style={{ marginLeft: "4px" }} alt="userimg"/>
                            <div style={{ marginLeft:"100px"}}>
                                <FormLabel >{imgname}</FormLabel>
                            </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="gender"
                                    onChange={setdata}
                                >
                                    <FormControlLabel value="female" control={<Radio />} label={t("Female")} />
                                    <FormControlLabel value="male" control={<Radio />} label={t("Male")} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <FormControlLabel control={<Checkbox onClick={termfunc} />} label={t("I_agree")} />
                            <Link href="/" >{t("T_C")}</Link>
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <Button onClick={handleOpenOtpWindow} className="button" variant="contained">{t("regbtn")}</Button>
                        </Grid>
                    </Grid>

                </Container>
            </div>



            {/*Otp Dialog box*/}

            <Dialog open={otpwindow} onClose={handleCloseOtpWindow}>

                <DialogTitle>{t("OTP")}</DialogTitle>

                <DialogContent>
                    <DialogContentText >
                        {t("OTP_sent")}
                    </DialogContentText>
                    <Input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    {/* onclick button calls checuser */}
                    <Button type='submit' style={{ marginTop: '30px' }} onClick={addinpdata} variant="contained" fullWidth >{t("Submit")}</Button>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseOtpWindow}>{t("Cancel")}</Button>
                </DialogActions>

            </Dialog>

        </>
    )
}
export default Register