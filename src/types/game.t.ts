import { IMoney } from "./money.t";
import { IPlayer } from "./player.t";
import { IScore } from "./score.t";

interface IGame {
  id: string;
  // players?: IPlayer | [];
  rules: {
    bet: number;
    birdie: number;
    eagle: number;
    three: boolean;
    triple: boolean;
    draw: boolean;
  };
  par: IPar;
  money: object;
}
interface IGamePlayer extends IGame {
  players: Array<IPlayer>;
}

interface IPar {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;
  17: number;
  18: number;
}

export type { IGame };
export type { IGamePlayer };
export type { IPar };
export class Game implements IGame {
  id: string;

  rules: {
    bet: number;
    birdie: number;
    eagle: number;
    three: boolean;
    triple: boolean;
    draw: boolean;
  };
  par: IPar;
  money: IMoney;
  constructor(obj?: any) {
    this.id = obj?.id ?? "";
    this.rules = obj?.rules ?? {
      bet: 5000,
      birdie: 10000,
      eagle: 50000,
      three: true,
      triple: true,
      draw: true,
    };
    this.par = obj?.par ?? {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
    };
    this.money = {};
  }
}

export class GameScore extends Game {
  players: Array<IPlayer>;
  // money: object;
  constructor(obj?: IGamePlayer) {
    super();
    this.id = obj?.id ?? "";
    this.rules = obj?.rules ?? {
      bet: 5000,
      birdie: 10000,
      eagle: 50000,
      three: true,
      triple: true,
      draw: true,
    };
    this.par = obj?.par ?? {
      1: 4,
      2: 4,
      3: 4,
      4: 4,
      5: 4,
      6: 4,
      7: 4,
      8: 4,
      9: 4,
      10: 4,
      11: 4,
      12: 4,
      13: 4,
      14: 4,
      15: 4,
      16: 4,
      17: 4,
      18: 4,
    };

    this.players = obj?.players ?? new Array<IPlayer>();
  }
  parTotal(round?: string) {
    return Object.values(this.par)
      .filter((p, i) => {
        if (round === "first") {
          return i < 9;
        } else if (round === "second") {
          return i >= 9;
        } else {
          return true;
        }
      })
      .reduce((accumulator, currentValue) => {
        return Number(accumulator) + Number(currentValue);
      }, 0);
  }
}
