import { Button, Dialog, DialogActions, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FreezeScreen = ({ freezeWindow, SetFreezeWindow }) => {

    //use to navigate to a route
    const navigate = useNavigate()

    //goto after login
    const Action = () => {
        SetFreezeWindow(false);
        navigate('/User/Expense')
    }

    //cancel login
    const goBack = () =>{
        SetFreezeWindow(false);
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <Dialog open={freezeWindow} fullWidth>
            <DialogTitle style={{ fontWeight: "bold", textAlign: "center"}}>Note</DialogTitle>
            <DialogContentText style={{fontSize: "1.2rem",textAlign: "center"}}>For Educational Purpose Only</DialogContentText>
                <DialogActions >
                    <Button onClick={goBack} style={{ fontWeight: "bold"}} autoFocus>Cancel</Button>
                    <Button onClick={Action} style={{fontWeight: "bold"}} autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default FreezeScreen