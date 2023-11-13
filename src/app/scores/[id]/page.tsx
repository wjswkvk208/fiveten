"use client";
import * as React from "react";
import { Alert, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";

import useGame, { EditGame } from "@/hooks/Game";
import { IPlayer } from "@/types/player.t";
import PlayerInputDialog from "@/components/PlayerInputDialog";
import { Score } from "@/types/score.t";
import { GameScore, IGamePlayer } from "@/types/game.t";
import BirdieModal from "@/components/EventModal";
import ScoreBoard from "@/components/ScoreBoard";
import CalcMoney from "@/utils/money";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useTitles from "@/hooks/Title";

const mapToObject = (map: any) => Object.fromEntries(map.entries());

export default function Scores({ params }: { params: { id: string } }) {
  const { game, isLoading, error, mutate } = useGame(params.id);

  const [round, setRound] = useState("first");
  const [hole, setHole] = useState(1);

  const [open, setOpen] = useState(false);
  const [titles, setTitles] = useTitles(game as IGamePlayer);
  const MySwal = withReactContent(Swal);
  const { trigger } = EditGame(params.id);
  const gameInstance = new GameScore(game);

  const handleClickOpen = (k: any) => {
    setHole(Number(k));
    setOpen(true);
  };

  const handleClose = () => {
    if (!game) return;

    setTitles(hole as number);
    setOpen(false);
    trigger({ money: { ...game.money, [hole]: mapToObject(CalcMoney(hole, game)) } });
  };

  React.useEffect(() => {
    if (titles && titles[hole]?.birdie.length) {
      MySwal.fire({
        title: <p>Nice Birdie!</p>,
        icon: "success",
        didOpen: () => {
          // `MySwal` is a subclass of `Swal` with all the same instance & static methods
          // MySwal.showLoading();
        },
      });
    }

    if (titles && titles[hole]?.eagle.length) {
      MySwal.fire({
        title: <p>Amazing Eagle!</p>,
        icon: "success",
        didOpen: () => {
          // `MySwal` is a subclass of `Swal` with all the same instance & static methods
          // MySwal.showLoading();
        },
      });
    }
  }, [titles]);

  const handleHole = (e: any) => {
    setHole(e.target.value);
  };

  return (
    <>
      <Grid container spacing={3}>
        {isLoading && <CircularProgress />}
        {error && <Alert severity="error">수리중...</Alert>}

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
            <Table size="small" sx={{ masWidth: 518 }}>
              <TableHead>
                <TableRow>
                  <TableCell component="th" scope="row" sx={{ minWidth: 86 }}>
                    Hole
                  </TableCell>

                  {Object.keys(Score())
                    .filter(i => {
                      if (round === "first") {
                        return Number(i) < 10;
                      } else {
                        return Number(i) > 9;
                      }
                    })
                    .map((k: string) => {
                      return (
                        <TableCell
                          align="center"
                          sx={{ px: 0 }}
                          key={k}
                          onClick={() => {
                            handleClickOpen(Number(k));
                          }}
                        >
                          {k}
                        </TableCell>
                      );
                    })}

                  <TableCell align="center" sx={{ minWidth: 72 }}>
                    Total
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Par</TableCell>
                  {game &&
                    Object.values(game.par)
                      .filter((v, i) => {
                        if (round === "first") {
                          return i < 9;
                        } else {
                          return i >= 9;
                        }
                      })
                      .map((p: any, i: number) => (
                        <TableCell
                          key={i}
                          align="center"
                          onClick={() => {
                            handleClickOpen(i + 1);
                          }}
                        >
                          {p !== 0 ? p : "-"}
                        </TableCell>
                      ))}
                  <TableCell align="center">{gameInstance.parTotal("first") + gameInstance.parTotal("second")}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>

          {game &&
            game.players.map((player: IPlayer, index: number) => (
              <TableContainer component={Paper} sx={{ mt: 2 }} key={player.id}>
                <Table size="small">
                  <TableBody>
                    <ScoreBoard money={game.money} player={player} round={round} onClick={handleClickOpen} par={gameInstance.parTotal()} hole={hole} />
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
        </Grid>
      </Grid>

      {game && <PlayerInputDialog open={open} onClose={handleClose} /* par={par} onSetPar={handlePar} */ hole={hole} onSetHole={handleHole} game={game} />}
      <BirdieModal />
    </>
  );
}

// import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
