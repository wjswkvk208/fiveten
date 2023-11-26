"use client";

import Loading from "@/components/Loading";
import CustomPagination from "@/components/board/list/CustomPagination";
import PostList from "@/components/board/list/PostList";

import { useList } from "@/hooks/Board";
import { Box, CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function List() {
  const searchParams = useSearchParams();
  const [pageIndex, setPageIndex] = useState(1);
  const tag = searchParams.get("tag");
  const username = searchParams.get("useranme");
  //const [tag, setTag] = useState("");
  const { data, isLoading } = useList({ page: pageIndex, tag, username });

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "title", headerName: "제목", width: 150 },
    {
      field: "user.email",
      headerName: "작성자",
      width: 150,
      valueGetter: ({ row }) => {
        return row.user.email;
      },
    },
    { field: "publishedDate", headerName: "등록일", width: 150 },
  ];

  if (isLoading) return <Loading />;

  return (
    //<Responsive>
    <>
      {data && (
        <>
          <PostList rows={data.rows} />
          <CustomPagination page={pageIndex} count={data.LastPage} handleChange={setPageIndex} />
        </>
      )}
    </>
    //</Responsive>
  );
}
