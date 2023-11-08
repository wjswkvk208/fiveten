import useSWR from "swr";
import { unstable_serialize } from "swr";
import { Game, IGame, IGamePlayer, IPar } from "@/types/game.t";
import useSWRMutation, { TriggerWithArgs } from "swr/mutation";
import { IRule } from "@/types/rule.t";

const useGame = (id: string) => {
  const fetcher = (url: string) => fetch(url).then(r => r.json());
  const { data, error, isLoading, mutate } = useSWR<IGamePlayer>(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, fetcher);

  return { game: data, error, isLoading, mutate };
};

export const CreateGame = async () => {
  console.log("asdf", process.env.NEXT_PUBLIC_API_URL);
  // debugger;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new Game()),
    caches: "no-store",
  };

  return (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games`, options)).json();
};

//

export const EditGame = (id: string) => {
  // debugger;
  const fetcher = (url: string, { arg }: { arg: { rules?: IRule; par?: IPar; money?: object } }) =>
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   rules: arg.rules,
      // }),
      body: JSON.stringify({ ...arg }),
    }).then(r => r.json());
  const { data, trigger, isMutating } = useSWRMutation<IGame>(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, fetcher);

  return { game: data, trigger, isMutating };
};

export default useGame;
