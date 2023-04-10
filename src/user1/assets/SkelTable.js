import React from "react";
import { Skeleton } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const MaterialTableSkeleton = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton animation="wave" />
            </TableCell>
            <TableCell>
              <Skeleton animation="wave" />
            </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton animation="wave" />
              </TableCell>
              <TableCell>
                <Skeleton animation="wave" />
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTableSkeleton;
