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
import { typeTitles } from "@/types/title.t";
import Image from "next/image";
// import jordan from "/public/static/images/cards/jordan.gif";
// import eagle from "/public/static/images/cards/eagle.gif";
// import birdie from "/public/static/images/cards/birdie.gif";

const mapToObject = (map: any) => Object.fromEntries(map.entries());
const imageLoader = ({ src, width, quality }: any) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
};
export default function Scores({ params }: { params: { id: string } }) {
  const { game, isLoading, error, mutate } = useGame(params.id);

  const [round, setRound] = useState("first");
  const [hole, setHole] = useState(1);

  const [open, setOpen] = useState(false);
  const [titles, saveTitles] = useTitles(game as IGamePlayer);
  const MySwal = withReactContent(Swal);
  const { trigger } = EditGame(params.id);
  const gameInstance = new GameScore(game);

  const handleClickOpen = (k: any) => {
    setHole(Number(k));
    setOpen(true);
  };

  const handleClose = () => {
    if (!game) return;

    saveTitles(hole as number);
    setOpen(false);
    trigger({ money: { ...game.money, [hole]: mapToObject(CalcMoney(hole, game)) } });
  };

  React.useEffect(() => {
    const Queue = MySwal.mixin({});

    (async () => {
      if (titles && titles[hole as keyof typeTitles].birdie.length) {
        await Queue.fire({
          title: <p>Nice Birdie!</p>,
          html: <Image loader={imageLoader} src={"cards/birdie.gif"} width={500} height={240} alt="나이스 버디" />,
          didOpen: () => {},
        });
      }

      if (titles && titles[hole as keyof typeTitles].eagle.length) {
        await Queue.fire({
          title: <p>Amazing Eagle!</p>,
          html: <Image loader={imageLoader} src={"cards/eagle.gif"} width={500} height={240} alt="어메이징 이글" />,
          didOpen: () => {},
        });
      }

      if (titles && titles[hole as keyof typeTitles].quadruple.length) {
        await Queue.fire({
          title: "동반자들의 속마음",
          //html: '<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><img src="../../../../public/static/images/cards/jordan.gif" width="100%" height="100%" style="position:absolute" frameBorder="0"  ></img></div>',
          html: <Image loader={imageLoader} src={"cards/jordan.gif"} width={500} height={240} alt="동반자들의 속마음" />,
          // didOpen: () => {},
        });
      }
    })();
  }, [MySwal, hole, titles]);

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
                          sx={{
                            px: 0,
                            width: 40,
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
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
                          sx={{
                            px: 0,
                            "&:hover": {
                              cursor: "pointer",
                            },
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
