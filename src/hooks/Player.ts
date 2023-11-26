import { Score } from "@/types/score.t";
import useSWRMutation from "swr/mutation";

export const CreatePlayer = (id: string) => {
  const namer = require("korean-name-generator");
  const name = namer.generate(true);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      money: 0,
      score: Score(),
      gameId: id,
    }),
  };

  const fetcher = (url: string) => fetch(url, options).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/players`, fetcher);
  return { player: data, trigger, isMutating };
};

export const RemovePlayer = (id: string) => {
  const options = {
    method: "DELETE",
    headers: {},
  };

  const fetcher = (url: string) => fetch(url, options);

  const { trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/players/${id}`, fetcher);
  return { trigger, isMutating };
};

export const EditPlayer = (id: string) => {
  const fetcher = (
    url: string,
    {
      arg,
    }: {
      arg: {
        name?: string;
        money?: number;
        score?: object;
      };
    }
  ) =>
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...arg }),
    }).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/players/${id}`, fetcher);
  return { player: data, trigger, isMutating };
};

// export const InputScore = (id: string) => {
//   const fetcher = (url: string, { arg }: { arg: { playerName: string } }) =>
//     fetch(url, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         // name: arg.playerName,
//         // money: 0,
//         score: {},
//         // gameId: id,
//       }),
//     }).then(r => r.json());
//   const { data, trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/score/${id}`, fetcher);
//   return { player: data, trigger, isMutating };
// };
