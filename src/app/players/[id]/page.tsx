"use client";
import { Box, Button, ButtonGroup, Grid, Paper, TextField, Typography } from "@mui/material";
import { IPlayer } from "@/types/player.t";
import useGame, { CreateGame } from "@/hooks/Game";
import { CreatePlayer, RemovePlayer } from "@/hooks/Player";
import PlayerInput from "@/components/PlayerInput";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CustomStepper from "@/components/Stepper";
export default function Players(props: any) {
  const { game, isLoading, error, mutate } = useGame(props.params.id);
  const { player, trigger: createTrigger, isMutating: createMutate } = CreatePlayer(props.params.id);

  if (isLoading || error) return <></>;
  return (
    <>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          즐거운 골프, 스크라치
        </Typography>

        <CustomStepper />
        <Typography variant="h6" gutterBottom>
          규칙 설정
        </Typography>

        <Grid container spacing={3}>
          {game &&
            game.players.map((player: IPlayer, index: number) => (
              <Grid item xs={12} key={player.id}>
                <PlayerInput pid={player.id} index={index} playerName={player.name} mutate={mutate} required label="플레이어" variant="standard" fullWidth sx={{ m: 1 }} size="small" />
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
          <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ m: 1 }}>
            <Button
              onClick={async () => {
                const result = await createTrigger(null, {
                  onSuccess: (data, key, config) => {
                    // console.log(data, key, config, `http://localhost:9999/games/${props.params.id}`);
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
        </Box>
      </Paper>

      {/* <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column", m: 1 }}>
        <Typography variant="h2" component="h2">
          플레이어 관리
        </Typography>

        {game &&
          game.players.map((player: IPlayer, index: number) => (
            <PlayerInput key={player.id} pid={player.id} index={index} playerName={player.name} mutate={mutate} required label="플레이어" variant="standard" fullWidth sx={{ m: 1 }} size="small" />
          ))}
      </Box> */}

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        
        <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ m: 1 }}>
          <Button
            onClick={async () => {
              const result = await createTrigger(null, {
                onSuccess: (data, key, config) => {
                  // console.log(data, key, config, `http://localhost:9999/games/${props.params.id}`);
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
      </Box> */}
    </>
  );
}
