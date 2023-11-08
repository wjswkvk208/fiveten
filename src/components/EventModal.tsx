import * as React from "react";

import Close from "@mui/icons-material/Close";
import Delete from "@mui/icons-material/Delete";
import Download from "@mui/icons-material/Download";
import InsertLink from "@mui/icons-material/InsertLink";
import Crop from "@mui/icons-material/Crop";
import { Box, Button, IconButton, Paper, Typography, Modal } from "@mui/material";
import { AspectRatio } from "@mui/icons-material";
import Image from "next/image";
import yosemite from "../../public/static/images/cards/yosemite.jpg";
export default function EventModal(props: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal open={open} onClose={() => {}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          py: 2,
          borderRadius: "xs",
        }}
      >
        <Box
          sx={{
            border: "1px solid",
            borderColor: "var(--joy-palette-neutral-outlinedBorder)",
            alignSelf: "center",
            maxWidth: "100%",
            minWidth: { xs: 220, sm: 360 },
            mx: "auto",
            boxShadow: "sm",
            borderRadius: "md",
            overflow: "auto",
          }}
        >
          <Paper
            sx={{
              borderWidth: "0 0 1px 0",
              display: "flex",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid",
              borderColor: "var(--joy-palette-neutral-outlinedBorder)",
            }}
          ></Paper>
          <Paper sx={{ p: 2 }}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: "md",
                overflow: "auto",
                borderColor: "var(--joy-palette-neutral-outlinedBorder)",
                bgcolor: "background.level1",
              }}
            >
              <Image alt="sdfsdfsdfsdf" src={yosemite} width={500} height={500} />
              <Box
                sx={{
                  display: "flex",
                  p: 1.5,
                  gap: 1.5,
                  "& > button": { bgcolor: "background.surface" },
                }}
              ></Box>
            </Paper>
          </Paper>
          <Paper
            sx={{
              display: "flex",
              p: 2,
              borderTop: "1px solid",
              borderColor: "var(--joy-palette-neutral-outlinedBorder)",
              gap: 1,
            }}
          ></Paper>
        </Box>
      </Box>
    </Modal>
  );
}
