"use client";
import { Box, Input } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
//import ReactQuill from "react-quill";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
// const EditorBlock = styled(Responsive)`
//   padding-top: 5rem;
// `;

const QuillWrapper = styled("div")({
  ".ql-editor": {
    padding: 0,
    minHeight: 320,
    fontSize: "1.125rem",
    lineHeight: 1.5,
  },
});

const Editor = ({ title, content, onChangeField }: any) => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  return (
    <Box sx={{ py: "5rem" }}>
      <Input
        placeholder="제목을 입력하세요."
        onChange={e => onChangeField({ key: "title", value: e.target.value })}
        value={title}
        sx={{ fontSize: "3rem", outline: "none", pb: "0.5rem", border: "none", borderBottom: 1, borderColor: "primary.main", mb: "2rem", width: 1 }}
      />
      <QuillWrapper>
        <ReactQuill theme="snow" value={content} onChange={v => onChangeField({ key: "content", value: v })} />
      </QuillWrapper>
    </Box>
  );
};

export default Editor;
