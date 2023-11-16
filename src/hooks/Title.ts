import { IGamePlayer } from "@/types/game.t";
import { IScore } from "@/types/score.t";
import { eightTeen, typeTitles } from "@/types/title.t";
import { useCallback, useState } from "react";

export default function useTitles(game: IGamePlayer): [value: typeTitles, handler: (hole: number) => Promise<void>] {
  const [title, setTitle] = useState(eightTeen());

  // 함수 정의
  const handler = useCallback(
    async (hole: number) => {
      // setBirdie([]);
      // setEagle([]);
      if (!game) return;

      // console.log(birdie, eagle);
      const birdie = [] as string[];
      const eagle = [] as string[];
      const quadruple = [] as string[];

      const promise = game.players.map(async p => {
        // console.log(p.score[hole as keyof IScore]);
        if (Number(p.score[hole as keyof IScore]) === -1) {
          birdie.push(p._id);
        }

        if (Number(p.score[hole as keyof IScore]) === -2) {
          eagle.push(p._id);
        }

        if (Number(p.score[hole as keyof IScore]) >= 4) {
          quadruple.push(p._id);
        }
      });

      Promise.all(promise).then(() => {
        // console.log("promise", { birdie, eagle });
        setTitle(title => {
          return { ...title, [hole]: { birdie, eagle, quadruple } };
        });
      });
    },
    [game]
  );

  return [title, handler];
}
