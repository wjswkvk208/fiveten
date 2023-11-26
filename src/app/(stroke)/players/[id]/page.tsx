"use client";
import { Alert, Box, Button, ButtonGroup, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { IPlayer } from "@/types/player.t";
import useGame, { CreateGame } from "@/hooks/Game";
import { CreatePlayer, RemovePlayer } from "@/hooks/Player";
import PlayerInput from "@/components/PlayerInput";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CustomStepper from "@/components/Stepper";
export default function Players(props: any) {
  const { game, isLoading, error, mutate } = useGame(props.params.id);
  const { player, trigger: createTrigger, isMutating: createMutate } = CreatePlayer(props.params.id);

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {isLoading && <CircularProgress />}
        {error && <Alert severity="error">수리중...</Alert>}
        {game &&
          game.players.map((player: IPlayer, index: number) => (
            <Grid item xs={12} key={player._id}>
              <PlayerInput pid={player._id} index={index} playerName={player.name} mutate={mutate} required label="플레이어" variant="standard" fullWidth sx={{ m: 1 }} size="small" />
            </Grid>
          ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* <UserButton id={props.params.id} create={trigger} isMutating={isMutating} /> */}
        {game && game.players.length < 5 && (
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ m: 1 }}>
            <Button
              onClick={async () => {
                const result = await createTrigger(null, {
                  onSuccess: (data, key, config) => {
                    mutate();
                  },
                });
              }}
              disabled={createMutate}
              startIcon={<PersonAddAlt1Icon />}
            >
              {props.isMutating ? "생성중" : ""}
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </>
  );
}
