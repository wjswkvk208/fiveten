import { IMoney } from "@/types/money.t";
import { IPlayer } from "@/types/player.t";
import { Box, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText, SvgIcon, SvgIconProps, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { red, green } from "@mui/material/colors";

export default function ScoreBoard(props: { money: IMoney; player: IPlayer; round: string; onClick: Function; par: number; hole: number }) {
  const format = new Intl.NumberFormat();
  const { money, player } = props;
  const [open, setOpen] = useState(false);
  // debugger;
  const playerScoreTotal =
    Object.values(player.score).reduce((accumulator, currentValue) => {
      return Number(accumulator) + Number(currentValue ?? 0);
    }, 0) ?? "-";

  const thisHole = money?.[props.hole as keyof IMoney]?.[player.id as keyof object] ?? 0;

  // debugger;
  const totalHole = Object.keys(money).reduce((accumulator, currentValue) => {
    return Number(accumulator) + Number(money?.[Number(currentValue) as keyof IMoney]?.[player.id as keyof object] ?? 0);
  }, 0);

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" sx={{ minWidth: 86 }}>
          {player.name}
        </TableCell>
        {Object.values(player.score)
          .filter((v, i) => {
            if (props.round === "first") {
              return i < 9;
            } else {
              return i >= 9;
            }
          })
          .map((s, i) => {
            return (
              <TableCell
                align="center"
                sx={{
                  width: 40,
                  px: 0,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                key={i + 1}
                onClick={() => props.onClick(i + 1)}
              >
                {s ?? "-"}
              </TableCell>
            );
          })}

        <TableCell align="center" sx={{ minWidth: 72 }}>
          {Number(playerScoreTotal) + props.par}
        </TableCell>
      </TableRow>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="right" colSpan={3}>
          이번홀 계산
        </TableCell>
        <TableCell align="right" colSpan={2}>
          {format.format(thisHole)}
        </TableCell>
        <TableCell align="right" colSpan={3}>
          전체 계산
        </TableCell>
        <TableCell align="right" colSpan={2}>
          {format.format(totalHole)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Money Record
              </Typography>

              <List dense={true}>
                {Object.keys(money).map(h => {
                  if (!money) return <>There are no records yet</>;

                  const balance = Number(money[h as unknown as keyof IMoney]?.[player.id]);

                  const a = balance < 0 ? { sx: { color: red[500] } } : balance > 0 ? { sx: { color: green[500] } } : "";
                  return (
                    <ListItem key={h}>
                      <ListItemIcon>
                        <MoneyIcon {...a} />
                      </ListItemIcon>
                      <ListItemText primary={`Hole ${h} : ${format.format(balance)}`} />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function MoneyIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M440-280h80v-40h40q17 0 28.5-11.5T600-360v-120q0-17-11.5-28.5T560-520H440v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T360-600v120q0 17 11.5 28.5T400-440h120v40H360v80h80v40ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
      </svg>
    </SvgIcon>
  );
}
