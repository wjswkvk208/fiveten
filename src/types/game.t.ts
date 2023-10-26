interface IGame {
  id: string;

  rules: {
    금액: number;
    버디금액: number;
    이글금액: number;
    쓰리동타: boolean;
    트리플: boolean;
    무승부: boolean;
  };
  score: object;
}

export type { IGame };

export class Game implements IGame {
  id: string;

  rules: {
    금액: number;
    버디금액: number;
    이글금액: number;
    쓰리동타: boolean;
    트리플: boolean;
    무승부: boolean;
  };
  score: object;
  constructor() {
    this.id = "";

    this.rules = {
      금액: 5000,
      버디금액: 10000,
      이글금액: 50000,
      쓰리동타: true,
      트리플: true,
      무승부: true,
    };
    this.score = {};
  }
}
