import { AppBar, Container, Dialog, FormControl, FormLabel, IconButton, InputLabel, MenuItem, Paper, Select, Slide, Stack, ToggleButton, ToggleButtonGroup, Toolbar, Typography } from "@mui/material";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { IPlayer } from "@/types/player.t";
import PlayerScoreInputTable from "./PlayerScoreInputTable";
import { EditGame } from "@/hooks/Game";

const PlayerInputDialog = (props: any) => {
  const { open, onClose, /* par, onSetPar, */ hole, onSetHole, game } = props;
  const { trigger } = EditGame(game.id);
  const [par, setPar] = useState(game.par);

  useEffect(() => {
    if (par[hole]) {
      trigger({
        par: { ...game.par, [hole]: par[hole] },
      });
    } else if (!par[hole]) {
    }
  }, [game.par, hole, par, trigger]);

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {hole} 홀 스코어 입력
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="holeIndex">Hole</InputLabel>
            <Select labelId="holeIndex" value={hole} label="Hole" onChange={onSetHole}>
              {[...Array(18).keys()].map(h => (
                <MenuItem value={h + 1} key={h + 1}>
                  {h + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <ToggleButtonGroup
            color="primary"
            value={par[hole]}
            exclusive
            onChange={(e, p) => {
              setPar({ ...game.par, [hole]: p });
            }}
            aria-label="Par"
            sx={{ pt: 0, pb: 4 }}
            fullWidth
          >
            <ToggleButton value="3">Par3</ToggleButton>
            <ToggleButton value="4">Par4</ToggleButton>
            <ToggleButton value="5">Par5</ToggleButton>
          </ToggleButtonGroup>

          <Stack spacing={2} alignItems="center">
            {game && game.players.map((player: IPlayer, index: number) => <PlayerScoreInputTable key={player._id} player={player} hole={hole} />)}
          </Stack>
        </Paper>
      </Container>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default PlayerInputDialog;
