"use client";

import React from "react";
import qs from "qs";
import { Box } from "@mui/material";
import { Pagination } from "@mui/material";
import { useRouter } from "next/navigation";

const CustomPagination = (props: any) => {
  return (
    <Pagination
      count={props.count}
      page={props.page}
      onChange={(e, p) => {
        props.handleChange(p);
      }}
    ></Pagination>
  );
};

export default CustomPagination;
