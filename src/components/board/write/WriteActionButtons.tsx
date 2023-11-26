"use client";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const WriteActionButtonBlock = styled("div")`
  margin-top: "1rem";
  margin-bottom: "3rem";
  button + button {
    margin-left: "0.5rem";
  }
`;

const WriteActionButtons = ({ onCancel, onPublish }: { onCancel: any; onPublish: any }) => {
  return (
    <WriteActionButtonBlock>
      <Button variant="outlined" onClick={onPublish}>
        등록
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        취소
      </Button>
    </WriteActionButtonBlock>
  );
};

export default WriteActionButtons;
