import { IGamePlayer } from "@/types/game.t";
import { IScore } from "@/types/score.t";
import { eightTeen, typeTitles } from "@/types/title.t";
import { useCallback, useState } from "react";

export default function useTitles(game: IGamePlayer): [value: typeTitles, handler: (hole: number) => Promise<void>] {
  const [title, setTitle] = useState(eightTeen());
  // const [birdie, setBirdie] = useState<string[]>([]);
  // const [eagle, setEagle] = useState<string[]>([]);
  // 함수 정의
  const handler = useCallback(
    async (hole: number) => {
      // setBirdie([]);
      // setEagle([]);
      if (!game) return;

      // console.log(birdie, eagle);
      const birdie = [] as string[];
      const eagle = [] as string[];
      const promise = game.players.map(async p => {
        // console.log(p.score[hole as keyof IScore]);
        if (Number(p.score[hole as keyof IScore]) === -1) {
          //await setBirdie([...birdie, p._id]);

          birdie.push(p._id);
          // console.log(birdie, p._id);
        }

        if (Number(p.score[hole as keyof IScore]) === -2) {
          // await setEagle([...eagle, p._id]);
          eagle.push(p._id);
        }
      });

      Promise.all(promise).then(() => {
        // console.log("promise", { birdie, eagle });
        setTitle(title => {
          // console.log({ [hole]: { birdie, eagle } });
          return { ...title, [hole]: { birdie, eagle } };
        });
      });

      //setTitle(title => {...title, title[hole]});
      // return title;
    },
    [game]
  );

  return [title, handler];
}
