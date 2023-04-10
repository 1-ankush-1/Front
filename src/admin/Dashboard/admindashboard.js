import React, { useEffect } from 'react'
import AppBar from './Appbar'
import Data from './data'
import { Routes, Route, useNavigate } from 'react-router-dom'
import GstTable from './gstTable'
import FeedbackTable from './feedbackTable'
import { Paper } from '@mui/material'
import AdminTable from './adminTable'
import AdminStocks from './adminStocks'
import AdminFunds from './adminFunds'

const AdminDashboard = () => {

  const navigate = useNavigate();
  
  useEffect(()=>{
      try{
        const isAdminLoggedIn = () =>{
          localStorage.getItem("admin_token") === null && navigate("/admin");
        }
        isAdminLoggedIn()
        // setData(JSON.parse(localStorage.getItem('data')))
      }
      catch (error) {
        console.log(error)
      }
  },[navigate]) 

  return (
    <>
      <AppBar/>
      <Paper style={{ marginTop: "62px", paddingBottom: "40px"}}>
      <Routes>
        <Route path='/' element={<Data />}></Route>
        <Route path='/gst' element={<GstTable />}></Route>
        <Route path='/feedback' element={<FeedbackTable />}></Route>
        <Route path='/admin' element={<AdminTable/>}></Route>
        <Route path='/stocks' element={<AdminStocks/>}></Route>
        <Route path='/funds' element={<AdminFunds/>}></Route>
      </Routes>
      </Paper>
    </>

  )
}

export default AdminDashboard