import React, { useState, useEffect, useContext } from 'react';
import {Box, Container, Dialog, DialogTitle,  Button, Typography, Table, TableBody, TableCell, TableHead, TableRow, Grid, Avatar, Modal, DialogActions,DialogContent} from '@mui/material';
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

export default function FeedbackTable() {

  const context = useContext(userContext);
  const { feedbacks, getFeedbacks, deleteFeedback, PermitFeedback, UnPermitFeedback } = context;

  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedback, setFeedback] = useState({})

  //feedback permission
  const [feedbackPermission, setFeedbackPermission] = useState(false)

  //to approve feedback
  const handlePermitFeedback = (row) => {
    PermitFeedback(row._id);
    setFeedbackPermission(true)
    setFeedback(row)
    setTimeout(() => {
      setFeedbackPermission(false)
    }, 1000);
  }

  const handleUnPermitFeedback = () => setFeedbackPermission(false)

  //to disapprove feedback
  const unPermitFeedbackFunction = (row) => {
    UnPermitFeedback(row._id)
    setFeedbackPermission(true)
    setFeedback(row)
    setTimeout(() => {
      setFeedbackPermission(false)
    }, 1000);
  }

  //to remove feedback
  const deleteFeedbackFunction = (id) => {
    deleteFeedback(id)
    handleFeedbackClose()
  }

  //to open Feedback model
  const handleFeedbackClickOpen = (row) => {
    console.log("opened")
    console.log(row)
    setFeedbackOpen(true);
    setFeedback(row)
    console.log(feedback)
  };

  //to close feedback model
  const handleFeedbackClose = () => {
    setFeedbackOpen(false);
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className='container mt-5'>
       <Box sx={{ width: '100%' }} >
       <Typography component="h2" variant="h6" color="text.primary" sx={{textAlign:"center" , paddingTop:"20px"}}>
          All Feedbacks
        </Typography>

        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell>message</TableCell>
              <TableCell>Permission</TableCell>
              {/* <TableCell>Feedback Permission</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* to display every user */}
            {feedbacks?.map((row) => (
              <TableRow key={row._id}>

                <TableCell>
                  <Grid container>

                    <Grid>
                      <Avatar>
                        <Button>
                          <DoneIcon onClick={() => { handlePermitFeedback(row) }} color="secondary"/>
                        </Button>
                        <Modal
                          feedback={feedback}
                          open={feedbackPermission}
                          onClose={() => { handleUnPermitFeedback() }}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              This feedback has been updated
                            </Typography>
                          </Box>
                        </Modal>
                      </Avatar>
                    </Grid>

                    <Grid item>
                      <Avatar>
                        <Button>
                          <CloseIcon onClick={() => { unPermitFeedbackFunction(row) }} color="secondary"/>
                        </Button>
                      </Avatar>
                    </Grid>

                    <Grid item>
                      <Avatar>
                        <Button>
                          <DeleteIcon onClick={() => { handleFeedbackClickOpen(row) }} color="secondary"/>
                        </Button>

                        {/*on click of delete */}
                        <Dialog feedback={feedback} open={feedbackOpen} onClose={() => { handleFeedbackClose() }}>
                          <DialogTitle>Do you really want to remove this feedback?</DialogTitle>
                          <DialogContent>
                            {/* onclick button calls checuser */}
                          </DialogContent>

                          <DialogActions>
                            <Button style={{ marginTop: '30px' }} onClick={() => { deleteFeedbackFunction(feedback._id) }} variant="contained" >Yes</Button>
                            <Button style={{ marginTop: '30px' }} onClick={handleFeedbackClose} variant="contained">No</Button>
                          </DialogActions>
                        </Dialog>
                        {/* <DeleteIcon/> */}
                      </Avatar>
                    </Grid>
                  </Grid>
                </TableCell>

                <TableCell style={{ fontSize: "17px" }}>{row.email}</TableCell>
                <TableCell style={{ fontSize: "17px" }}>{row.message}</TableCell>
                <TableCell style={{ fontSize: "17px" }}>{row.feedbackpermission}</TableCell>
                {/* <TableCell>{row.permission}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>

        </Box>
    </div>
  )
}