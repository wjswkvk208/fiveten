import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const CreatePlayer = (id: string) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "",
      money: 0,
      score: {},
      gameId: id,
    }),
  };

  const fetcher = (url: string) => fetch(url, options).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation(`http://localhost:9999/players`, fetcher);
  return { player: data, trigger, isMutating };
};

export const RemovePlayer = (id: string) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify({
    //   name: "",
    //   money: 0,
    //   score: {},
    //   gameId: id,
    // }),
  };

  const fetcher = (url: string) => fetch(url, options).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation(`http://localhost:9999/players/${id}`, fetcher);
  return { player: data, trigger, isMutating };
};

export const EditPlayer = (id: string) => {
  const fetcher = (url: string, { arg }: { arg: { playerName: string } }) =>
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: arg.playerName,
        // money: 0,
        // score: {},
        // gameId: id,
      }),
    }).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation(`http://localhost:9999/players/${id}`, fetcher);
  return { player: data, trigger, isMutating };
};
