import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { postData } from '../api/serverServices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


//created manual copyright
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://praedicoglobalresearch.com/">
      praedicoglobalresearch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//Admin Login Function
export default function AdminLogin() {
  //create two states for email and password state
  const [emailId, setEmailId] = useState('')
  const [passWord, setPassword] = useState('')

  //initilize useNavigate Hook
  const navigate = useNavigate()

  //function to Check admin detail
  const handleSubmit = async () => {
    //here we store data of email and password state data
    const body = { email: emailId, password: passWord }
    //it calls PostData function and store if user is admin or not
    const response = await postData('checkadmin', body)

    //if admin response is true
    if (response.status) {
      //alert box for true
      localStorage.setItem("admin_token", response.token)
      navigate('/admin/dash')
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Succesfull Login',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      //alert box for false
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Invaild emailid/password',
        showConfirmButton: false,
        timer: 1500
      })
    }

  };

  //jsx
  return (

    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("https://res.cloudinary.com/dutk43ch5/image/upload/v1681110462/site/Admin_gdth4w.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'text.secondary' }} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmailId(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Copyright sx={{ mt: 5 }} />
          </Box>

        </Box>
      </Grid>
    </Grid>

  );
}