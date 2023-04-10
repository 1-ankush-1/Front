import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    FormControlLabel,
    Checkbox,
    FormControl,
    Button,
} from "@mui/material";
import Login from "./Login";
//translate
// import { useTranslation } from '../Translate/i18n';

function ServiceModal({ props, service, serviceClose }) {
    const [login, setOpenLogin] = useState(false);

    const loginOpen = () => {
        setOpenLogin(true);
        // console.log("click" + login)
    };

    const loginClose = () => {
        setOpenLogin(false);
        // console.log("click" + login)
    };

    return (
        <div>
            <Dialog open={service} onClose={serviceClose}>
                <h2 style={{ textAlign: "center", marginTop: "30px" }}>Services</h2>
                <DialogContent>
                    <FormControl >
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: "wrap" }}>
                            <FormControlLabel
                                style={{ flex: '1', margin: "30px" }}
                                control={
                                    <Checkbox checked={true} />
                                }
                                label={
                                    <div>
                                        <img src="https://res.cloudinary.com/dutk43ch5/image/upload/v1681110474/site/expense_kedrai.png" alt="Expense" width="150px" height="150px" />
                                        <span style={{ display: "flex", alignItems: "center" }}>Expense </span>
                                    </div>
                                }
                            // label="Expense (Starting from ₹500)"
                            />
                            <FormControlLabel
                                style={{ flex: '1', margin: "30px" }}
                                control={
                                    <Checkbox checked={true} />
                                }
                                label={<div>
                                    <img src="https://res.cloudinary.com/dutk43ch5/image/upload/v1681110491/site/GST_jqsf2j.png" alt="GST" width="150px" height="150px" />
                                    <span style={{ display: "flex", alignItems: "center" }}>GST Expense </span>
                                </div>}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: "wrap" }}>
                            <FormControlLabel
                                style={{ flex: '1', margin: "30px" }}
                                control={
                                    <Checkbox
                                        checked={true}
                                    />
                                }
                                label={<div>
                                    <img src="https://res.cloudinary.com/dutk43ch5/image/upload/v1681110485/site/accounting_r0zrts.png" alt="incometax" width="150px" height="150px" />
                                    <span style={{ display: "flex", alignItems: "center" }}>Tax Calculator</span>
                                </div>}
                            />
                            <FormControlLabel
                                style={{ flex: '1', margin: "30px" }}
                                control={
                                    <Checkbox
                                        checked={true}
                                    />
                                }
                                label={<div>
                                    <img src="https://res.cloudinary.com/dutk43ch5/image/upload/v1681110479/site/CA_bpmajd.png" alt="incometax" width="150px" height="150px" />
                                    <span style={{ display: "flex", alignItems: "center" }}>Chat to Professional</span>
                                </div>}
                            />
                        </div>
                    </FormControl>

                </DialogContent>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: "wrap" }}>

                    <Button
                        style={{ margin: "10px" }}
                        href="https://imjo.in/VQx5D2"
                        variant="contained"
                        color="primary"
                    >
                        1 Month&nbsp;(₹2500)
                    </Button>
                    <Button
                        style={{ margin: "10px" }}
                        href="https://imjo.in/VQx5D2"
                        variant="contained"
                        color="primary"

                    >
                        3 Months&nbsp;(₹5000)
                    </Button>
                    <Button
                        style={{ margin: "10px" }}
                        href="https://imjo.in/VQx5D2"
                        variant="contained"
                        color="primary"

                    >
                        6 Months&nbsp;₹8000
                    </Button>
                    <Button
                        style={{ margin: "10px" }}
                        href="https://imjo.in/VQx5D2"
                        variant="contained"
                        color="primary"

                    >
                        12 Months&nbsp;(₹12000)
                    </Button>
                </div>
            </Dialog>
            <Login props={props} login={login} loginOpen={loginOpen} loginClose={loginClose} />
        </div>
    );
}

export default ServiceModal;
