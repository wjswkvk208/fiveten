import { IGamePlayer, IPar } from "@/types/game.t";
import { IPlayer } from "@/types/player.t";
import { IScore, Score } from "@/types/score.t";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function getCombination<Type>(elements: Array<Type>, pick: number) {
  // 기저사례: 골라야 하는 길이가 1이면 각 원소가 조합이 된다.
  if (pick === 1) return elements.map(elem => [elem]);

  const combinations = new Array<Type[]>(pick);
  // 각 원소에 남은 원소로 만들 수 있는 조합들을 붙인다.
  elements.forEach((element, index) => {
    // 만약 남은 원소의 길이가 골라야 하는 길이보다 짧으면 빈 배열이 반환되기 때문에 조합이 생성되지 않는다.
    const smallerCombinations = getCombination(elements.slice(index + 1), pick - 1);
    smallerCombinations.forEach(combination => {
      combinations.push([element].concat(combination));
    });
  });
  return combinations;
}

export default function CalcMoney(hole: number, game: IGamePlayer | undefined) {
  if (game === undefined) return;

  const Money = new Map<string, number>();
  // 조합

  const ArrMatch = getCombination<IPlayer>(game.players, 2);

  let double = 1; // 배판체크
  let prevDraw = 1; //전판 두배판 체크
  if (game.rules.triple) {
    game.players.forEach(p => {
      const s = Number(p.score);
      const par = Number(game.par[hole as keyof IPar]);
      if (s >= 3 || (par === 3 && s >= 2) || s < 0) {
        double = 2;
      }
    });
  }

  if (game.rules.three) {
    const obj = game.players.reduce(
      (acc, cur) => {
        const s = cur.score[hole as keyof IPar]?.toString();
        acc[s as keyof typeof acc] = Number(acc[cur.score[hole as keyof typeof Score] as keyof typeof acc]) + 1 || 1;
        return acc;
      },
      {
        "-2": 0,
        "-1": 0,
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      }
    );

    if (Object.values(obj).findIndex(e => e >= 3) >= 0) {
      double = 2;
    } else {
      double = 1;
    }
  }

  if (game.rules.draw) {
    const obj = game.players.reduce(
      (acc, cur) => {
        const s = cur.score[(hole - 1) as keyof IPar]?.toString();
        acc[s as keyof typeof acc] = Number(acc[cur.score[(hole - 1) as keyof typeof Score] as keyof typeof acc]) + 1 || 1;
        return acc;
      },
      {
        "-2": 0,
        "-1": 0,
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
      }
    );

    if (Object.values(obj).findIndex(e => e === game.players.length) >= 0 && game.players.length >= 3) {
      prevDraw = 2;
    } else {
      prevDraw = 1;
    }
  }

  ArrMatch.map((match: IPlayer[]) => {
    const p1 = Number(match[0].score[hole as keyof IScore]);
    const p2 = Number(match[1].score[hole as keyof IScore]);

    const p1prize = p1 === -2 ? Number(game.rules.eagle) : p1 === -1 ? Number(game.rules.birdie) : 0;
    const p2prize = p2 === -2 ? Number(game.rules.eagle) : p2 === -1 ? Number(game.rules.birdie) : 0;

    const strokes = (p2prize - p1prize + (p1 - p2) * Number(game.rules.bet) * double) * prevDraw;

    // debugger;
    Money.set(match[0].id, Number(Money.get(match[0].id) ?? 0) - strokes);
    Money.set(match[1].id, Number(Money.get(match[1].id) ?? 0) + strokes);
    // debugger;
  });

  return Money;
}
