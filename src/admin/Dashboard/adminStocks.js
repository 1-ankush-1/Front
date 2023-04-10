import React, { useEffect, useContext } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import userContext from '../../context/users/userContext';

export default function AdminStocks() {
    const context = useContext(userContext);
    const { stocks, getStocks, getFunds } = context;

    useEffect(() => {
        //Runs only on the first render
        getStocks()
        // console.log(users);
        getFunds()
    }, []);

    return (
        <div className='container mt-5'>
            <Box sx={{ width: '100%' }} >

                <Typography component="h2" variant="h6" color="text.primary" sx={{ textAlign: "center", paddingTop: "20px" }}>
                    All Stocks of Users
                </Typography>
                <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Mail</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Month</TableCell>
                                <TableCell>Small Cap</TableCell>
                                <TableCell>Mid Cap</TableCell>
                                <TableCell>Large Cap</TableCell>
                                {/* <TableCell>Feedback Permission</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {/* to display every user */}
                            {stocks.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.year}</TableCell>
                                    <TableCell>{row.month}</TableCell>

                                    <TableCell>{JSON.parse(row.smallcap).data.map((list) =>
                                    // console.log(list.split("."))
                                    (
                                        <div style={{ margin: "10px" }}>{Object.values(list)[0]}  -  {Object.values(list)[1]}</div>
                                    )

                                    )}</TableCell>

                                    <TableCell>{JSON.parse(row.midcap).data ?
                                        JSON.parse(row.midcap).data.map((list) => (
                                            <div style={{ margin: "10px" }}>{Object.values(list)[0]}  -  {Object.values(list)[1]}</div>
                                        )) : ""
                                    }
                                    </TableCell>

                                    <TableCell>{JSON.parse(row.largecap).data ?
                                        JSON.parse(row.largecap).data.map((list) => (
                                            <div style={{ margin: "10px" }}>{Object.values(list)[0]}  -  {Object.values(list)[1]}</div>
                                        )) : ""
                                    }
                                    </TableCell>

                                </TableRow>

                            ))}   {/*map function close*/}

                        </TableBody>
                    </Table>

                </div>
            </Box>
        </div>
    )
}