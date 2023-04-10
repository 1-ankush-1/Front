import React from "react";
import { Skeleton } from "@mui/material";


const LineGraphSkeleton = () => {
  return (
    <Skeleton variant="rect" width="100%" height={300} animation="wave" />
  );
};

export default LineGraphSkeleton;
