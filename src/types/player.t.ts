interface IPlayer {
  id: string;
  name: string;
  money: number;
  score?: object;
  gameId: string;
}

export type { IPlayer };

export class Player implements IPlayer {
  id: string;
  name: string;
  money: number;
  score: object;
  gameId: string;
  constructor(id: string, name: string, gameId: string) {
    this.id = id;
    this.name = name;
    this.money = 0;
    this.score = {};
    this.gameId = gameId;
  }
}
