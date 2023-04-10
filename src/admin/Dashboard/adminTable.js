import React, { useEffect, useContext } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import userContext from '../../context/users/userContext';

export default function AdminTable() {

    const context = useContext(userContext);
    const { admins, getAdmins } = context;

    useEffect(() => {
        //Runs only on the first render
        getAdmins()
        // console.log(users);
    }, []);

    return (
        <div className='container mt-5'>
            <Box sx={{ width: '100%' }} >
                <Typography component="h2" variant="h6" color="text.primary" sx={{ textAlign: "center", paddingTop: "20px" }}>
                    All Admins
                </Typography>
                <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone Number</TableCell>
                                {/* <TableCell>Feedback Permission</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {/* to display every user */}
                            {admins?.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.adminemail}</TableCell>
                                    <TableCell>{row.mobilenumber}</TableCell>
                                    {/* <TableCell>{row.permission}</TableCell> */}
                                    {/* <TableCell>{row.permission}</TableCell> */}
                                </TableRow>

                            ))}   {/*map function close*/}

                        </TableBody>
                    </Table>

                </div>

            </Box>
        </div >
    )
}