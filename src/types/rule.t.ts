interface IRule {
  bet: number;
  birdie: number;
  eagle: number;
  three: boolean;
  triple: boolean;
  draw: boolean;
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
