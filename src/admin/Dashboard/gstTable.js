import React, { useEffect, useContext } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import userContext from '../../context/users/userContext';

export default function GstTable() {

  const context = useContext(userContext);
  const { gsts, getGsts } = context;

  //to get users
  useEffect(() => {
    //Runs only on the first render
    getGsts();
  }, []);

  return (
    <div className='container mt-5'>
      <Box sx={{ width: '100%' }} >
        <Typography component="h2" variant="h6" color="text.primary" sx={{ textAlign: "center", paddingTop: "20px" }}>
          All GST
        </Typography>

        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
        <Table >
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Turnover</TableCell>
                <TableCell>Business Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* to display every user */}
              {gsts?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell style={{ fontSize: "17px" }}>{row.email}</TableCell>
                  <TableCell style={{ fontSize: "17px" }}>{row.turnover}</TableCell>
                  <TableCell style={{ fontSize: "17px" }}>{row.businesstype}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Box>
    </div>
  )
}