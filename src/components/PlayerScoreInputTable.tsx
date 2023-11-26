import { FormControl, FormLabel, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import LooksOneOutlinedIcon from "@mui/icons-material/LooksOneOutlined";
import LooksTwoOutlinedIcon from "@mui/icons-material/LooksTwoOutlined";
import { EditPlayer } from "@/hooks/Player";
import { useEffect, useState } from "react";
import { InputScore } from "@/hooks/Score";

const PlayerScoreInputTable = (props: any) => {
  const { player, hole, par } = props;
  const { data, trigger } = InputScore(player.scoreId);

  useEffect(() => {
    if (player.score[hole] === null) {
      trigger(
        {
          score: { ...player.score, [hole]: "0" },
        },
        {
          onSuccess: data => {
            player.score[hole] = data.score[hole];
          },
        }
      );
    }
  }, [hole, player.score, trigger]);
  if (!player) {
    return <></>;
  }

  return (
    <FormControl key={player.id} sx={{ mt: 1 }}>
      <FormLabel>
        <Typography variant="h5" gutterBottom>
          {player.name}
        </Typography>
      </FormLabel>

      <ToggleButtonGroup
        size="large"
        value={player.score[hole]}
        // value={score}
        onChange={(e: React.MouseEvent<HTMLElement>, v: string | null) => {
          trigger(
            {
              score: { ...player.score, [hole]: v },
            },
            {
              onSuccess: data => {
                player.score[hole] = data.score[hole];
              },
            }
          );
          //setScore(v);
        }}
        exclusive={true}
        aria-label="Small sizes"
      >
        <ToggleButton value="-2">-2</ToggleButton>
        <ToggleButton value="-1">-1</ToggleButton>
        <ToggleButton value="0">0</ToggleButton>
        <ToggleButton value="1">1</ToggleButton>
        <ToggleButton value="2">2</ToggleButton>
        <ToggleButton value="3">3</ToggleButton>
        <ToggleButton value="4">4</ToggleButton>
        <ToggleButton value="5">5</ToggleButton>
      </ToggleButtonGroup>
    </FormControl>
  );
};

export default PlayerScoreInputTable;
