import useSWR from "swr";
import { Game } from "@/types/game.t";
import useSWRMutation from "swr/mutation";
import { IRule } from "@/types/rule.t";

const useGame = (id: string) => {
  const fetcher = (url: string) => fetch(url).then(r => r.json());
  const { data, error, isLoading, mutate } = useSWR(`http://localhost:9999/games/${id}`, fetcher);

  return { game: data, error, isLoading, mutate };
};

export const CreateGame = async () => {
  // debugger;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new Game()),
  };

  return (await fetch(`http://localhost:9999/games`, options)).json();
};

//

export const EditGame = (id: string) => {
  const fetcher = (url: string, { arg }: { arg: { rules: IRule } }) =>
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rules: arg.rules,
      }),
    }).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation(`http://localhost:9999/games/${id}`, fetcher);

  return { player: data, trigger, isMutating };
};

export default useGame;
