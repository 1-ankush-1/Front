import React, { useState, useEffect, useContext } from 'react';
import {Box, Container, Dialog, DialogTitle,  Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Grid, Avatar, Modal, DialogActions} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import userContext from '../../context/users/userContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Data() {
  //state
  //using useContext
  const context = useContext(userContext);
  const { users, getUsers, PermitUser, UnPermitUser, deleteUser } = context;

  //delete 
  //dialog box pop up
  const [open, setOpen] = useState(false)

  //to get user detail in delete dialog box
  const [user, setUser] = useState({})
  //to get feedback detail in dialog box

  //permission button
  const [permission, setPermission] = useState(false);

  //to approve user
  const handlePermit = (row) => {
    PermitUser(row._id);
    setPermission(true)
    setUser(row)
    setTimeout(() => {
      setPermission(false)
    }, 1000);
  };


  const handleUnPermit = () => setPermission(false);



  //to disapprove user
  const unPermitFunction = (row) => {
    UnPermitUser(row._id)
    setPermission(true)
    setUser(row)
    setTimeout(() => {
      setPermission(false)
    }, 1000);
  }


  //to remove user
  const deleteFunction = (id) => {
    deleteUser(id)
    handleClose()
  }


  //to open model
  const handleClickOpen = (row) => {
    console.log("opened")
    console.log(row)
    setOpen(true);
    setUser(row)
  };


  //to close model
  const handleClose = () => {
    setOpen(false);
  };

  //to get users
  useEffect(() => {
    //Runs only on the first render
    getUsers();
  }, []);


  return (
    <div className='container mt-5'>
      <Box sx={{ width: '100%' }} >

        <Typography component="h2" variant="h6" color="text.primary" sx={{textAlign:"center" , paddingTop:"20px"}}>
          All Users
        </Typography>

        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Permission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {/* to display every user */}
            {users.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Grid container>
                    {/*give permission*/}
                    <Grid item >
                      <Avatar>
                        <Button>
                          <DoneIcon onClick={() => { handlePermit(row) }} color="secondary"/>
                        </Button>
                        <Modal
                          user={user}
                          open={permission}
                          onClose={() => { handleUnPermit() }}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" >
                              {user.firstname} {user.lastname} status has been updated
                            </Typography>
                          </Box>
                        </Modal>
                      </Avatar>
                    </Grid>
                    {/*take permission*/}
                    <Grid item>
                      <Avatar>
                        <Button>
                          <CloseIcon onClick={() => { unPermitFunction(row) }} color="secondary"/>
                        </Button>
                      </Avatar>
                    </Grid>
                    {/*delete */}
                    <Grid item>
                      <Avatar>
                        <Button>
                          <DeleteIcon onClick={() => { handleClickOpen(row) }} color="secondary"/>
                        </Button>
                        <Dialog user={user} open={open} onClose={() => { handleClose() }}>
                          <DialogTitle>Do you really want to remove {user.firstname} {user.lastname}?</DialogTitle>
                          <DialogActions>
                            <Button style={{ marginTop: '30px' }} onClick={() => { deleteFunction(user._id) }} variant="contained" >Yes</Button>
                            <Button style={{ marginTop: '30px' }} onClick={handleClose} variant="contained">No</Button>
                          </DialogActions>
                        </Dialog>
                      </Avatar>
                    </Grid>

                  </Grid>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.firstname}</TableCell>
                <TableCell>{row.permission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        </Box>
    </div>
  );
}
