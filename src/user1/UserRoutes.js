import UserDashboard from './userDashboard';
import Homepage from './Homepage';
import Advisory from './Dashboard/Advisory';
import Expense  from './Dashboard/Expense/Expense';
import Gst  from './Dashboard/Gst';
import Calculator  from './Dashboard/Calculator';
import Profile from './Dashboard/Profile/Profile';
import {Routes,Route } from 'react-router-dom';
import About from './Dashboard/About';
import Contact from './Dashboard/Contact';
import UserState from '../context/users/UserState';
import { Paper } from '@mui/material';
//old profile
//import Profile from './Dashboard/Profile.js'

function UserRoutes() {

  return (
    <>
        <UserState/>
        <UserDashboard/>
        <Paper style={{ marginTop: "65px", paddingBottom: "40px"}}>
        <Routes> {/*At the place of * all the routes are added*/}
          <Route path='/' element={<Homepage/>} ></Route>
          <Route path='/Gst' element={<Gst/>} ></Route>
          <Route path='/Calculator' element={<Calculator/>} ></Route>
          <Route path='/Expense' element={<Expense/>} ></Route> 
          <Route path='/Advisory' element={<Advisory/>} ></Route>
          <Route path='/Profile' element={<Profile/>} ></Route>
          <Route path='/About' element={<About/>} ></Route>
          <Route path='/Contact' element={<Contact/>} ></Route>
        </Routes>
        </Paper>
       
    </>
  );
  
}

export default UserRoutes;
