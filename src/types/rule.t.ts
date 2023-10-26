interface IRule {
  금액: number;
  버디금액: number;
  이글금액: number;
  쓰리동타: boolean;
  트리플: boolean;
  무승부: boolean;
}

export type { IRule };

// export class Game implements IRule {
//   id: string;

//   rules: object;
//   score: object;
//   constructor() {
//     this.id = "";

//     this.rules = {};
//     this.score = {};
//   }
// }
