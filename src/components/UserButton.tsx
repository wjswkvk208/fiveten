"use client";
import { CreateGame } from "@/hooks/Game";
import { CreatePlayer } from "@/hooks/Player";
import { IPlayer } from "@/types/player.t";
import { Button, ButtonGroup } from "@mui/material";

function removePlayer(props: { id: string }) {
  console.log(props.id);
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "",
      money: 0,
      score: {},
      gameId: props.id,
    }),
  };

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/${props.id}`);
}

export function UserButton(props: any) {
  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ m: 1 }}>
      <Button
        onClick={async () => {
          const result = await props.trigger();
        }}
        disabled={props.isMutating}
      >
        {props.isMutating ? "생성중" : "+"}
      </Button>
      <Button
        onClick={() => {
          removePlayer(props);
        }}
      >
        -
      </Button>
    </ButtonGroup>
  );
}
