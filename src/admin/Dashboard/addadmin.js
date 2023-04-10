

import { useState,useContext } from 'react';
import {Dialog, DialogTitle,  Button, Typography, DialogActions,DialogContent, TextField} from '@mui/material';
import userContext from '../../context/users/userContext';
import Swal from 'sweetalert2';

const AddAdmin = () => {
    const [open, setOpen] = useState(false);

    const [Admin, setAdmin] = useState({ Name:"",adminemail: "", adminPassword: "", mobilenumber: "" })

    const context = useContext(userContext);
    const { AddAdmin } = context;

    const setdata = (e) => {
        console.log(e.target.name,e.target.value);
        const { name, value } = e.target;
        setAdmin((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Add_admin=async(Admin)=>{
        
        const result = await AddAdmin(Admin.Name,Admin.adminemail,Admin.adminPassword,Admin.mobilenumber)
        if(result.status){
            Swal.fire('Successfully added');
            handleClose()
        }else{
            Swal.fire('Failed');
        }
       
    }

    // const navigate=useNavigate()

    return (
        <>
            <Typography variant="h6" sx={{ mr: 2 }} style={{ cursor: 'pointer' }} onClick={handleClickOpen}>Add Admin</Typography>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add admin</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        id="mobilenumber"
                        label="Name"
                        type="text"
                        fullWidth
                        name='Name'
                        variant="standard"
                        value={Admin.Name}
                        onChange={setdata}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="adminemail"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        name='adminemail'
                        value={Admin.adminemail}
                        onChange={setdata}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="adminPassword"
                        label="admin password"
                        type="password"
                        fullWidth
                        variant="standard"
                        name='adminPassword'
                        value={Admin.adminPassword}
                        onChange={setdata}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="mobilenumber"
                        label="contactno"
                        type="tel"
                        fullWidth
                        name='mobilenumber'
                        variant="standard"
                        value={Admin.mobilenumber}
                        onChange={setdata}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={()=>{Add_admin(Admin)}}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddAdmin