import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const Logout = () => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        navigate('/admin')
        console.log("logout")
        localStorage.removeItem('admin_token');
      }
  return (
    <div>
      <Typography  variant="h6" component="div" sx={{ mr: 2 }} style={{ cursor: 'pointer' }}  onClick={handleLogout}>Logout</Typography>
    </div>
  )
}

export default Logout