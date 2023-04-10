import React from 'react'
import Nav from './Structure/Head/Nav'
import { Routes, Route } from 'react-router-dom';
import Register from "../user1/Register"
import Home from "./Structure/Body/Home";
import Contact from '../user1/Dashboard/Contact';
import About from '../user1/Dashboard/About';
import { Paper } from '@mui/material';

const Goto = () => {

  return (
    <>
      {/*header for first page and Register are same*/}
      <Nav />
      {/* they are the followup address after *  */}
      <Paper style={{ marginTop: "55px", paddingBottom: "30px" }}>
      <Routes>
        <Route path='/' element={<Home />}></Route>                        {/*go to first page*/}
        <Route path='/Register' element={<Register />}></Route>          {/*go to Register*/}
        <Route path='/Contact' element={<Contact />}></Route>
        <Route path='/About' element={<About />}></Route>
      </Routes>
      </Paper>

    </>
  )
}

export default Goto