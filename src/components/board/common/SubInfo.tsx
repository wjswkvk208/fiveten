import { Box, styled } from "@mui/material";
import React from "react";

// const SubInfoBlock = styled(Box)({
//   "span + span:before": {
//     paddingLeft: "0.25rem",
//     paddingRight: "0.25rem",
//     //content: " ",
//   },
// });
const SubInfo = ({ username, publishedDate }: { username: string; publishedDate: Date }) => {
  return (
    <Box>
      <span>
        <b>{username}</b>
      </span>
      <span> </span>
      <span>
        {publishedDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "short",
        })}
      </span>
    </Box>
  );
};

export default SubInfo;
