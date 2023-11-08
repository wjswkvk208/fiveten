import { IScore, Score } from "./score.t";

interface IPlayer {
  id: string;
  _id: string;
  name?: string;
  money: object;
  score: IScore;
  scoreId?: string;
  gameId: string;
}

export type { IPlayer };

// export class Player implements IPlayer {
//   id: string | undefined;
//   name: string;
//   money: object;
//   score: IScore;
//   gameId: string;
//   constructor({ obj }: { obj: { gameId: string; name: string; id?: string } }) {
//     this.id = obj?.id ?? undefined;
//     this.name = obj.name;
//     this.money = {};
//     this.score = Score();
//     this.gameId = obj.gameId;
//   }
// }
