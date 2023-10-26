"use client";
import CustomStepper from "@/components/Stepper";
import { Box, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Scores() {
  const [round, setRound] = useState("first");

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    // createData("Eclair", 262, 16.0, 24, 6.0),
    // createData("Cupcake", 305, 3.7, 67, 4.3),
    // createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
        즐거운 골프, 스크라치
      </Typography>

      <CustomStepper />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ToggleButtonGroup
            color="primary"
            value={round}
            exclusive
            onChange={(e, n) => {
              setRound(n);
            }}
            aria-label="round"
            sx={{ pt: 0, pb: 4 }}
            fullWidth
          >
            <ToggleButton value="first">전반</ToggleButton>
            <ToggleButton value="second">후반</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Hole</TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>

                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">6</TableCell>
                  <TableCell align="right">7</TableCell>
                  <TableCell align="right">8</TableCell>
                  <TableCell align="right">9</TableCell>

                  <TableCell align="right">Total</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Par</TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>

                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <Score key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

function Score(props: { row: ReturnType<typeof createData> }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">4</TableCell>
        <TableCell align="right">4</TableCell>
        <TableCell align="right">3</TableCell>
        <TableCell align="right">4</TableCell>

        <TableCell align="right">4</TableCell>
        <TableCell align="right">4</TableCell>
        <TableCell align="right">3</TableCell>
        <TableCell align="right">4</TableCell>

        <TableCell align="right">4</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
