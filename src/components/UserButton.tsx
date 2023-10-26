"use client";
import { CreateGame } from "@/hooks/Game";
import { CreatePlayer } from "@/hooks/Player";
import { IPlayer } from "@/types/player.t";
import { Button, ButtonGroup } from "@mui/material";

// async function makePlayer(props: { id: string }) {
//   console.log(props.id);
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: "",
//       money: 0,
//       score: {},
//       gameId: props.id,
//     }),
//   };

//   await fetch(`http://localhost:9999/players`, options)
//     .then(res => res.json())
//     .then(result => {
//       console.log(result);
//     });
// }

function makePlayer(props: { id: string }) {}

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

  fetch(`http://localhost:9999/players/${props.id}`);
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
