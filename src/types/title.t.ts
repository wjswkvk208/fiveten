export type typeTitle = {
  // hole: number;
  birdie: Array<string>;
  eagle: Array<string>;
  quadruple: Array<string>;
};

function Title() {
  return {
    birdie: [],
    eagle: [],
    quadruple: [],
  } as typeTitle;
}

export type typeTitles = {
  1: typeTitle;
  2: typeTitle;
  3: typeTitle;
  4: typeTitle;
  5: typeTitle;
  6: typeTitle;
  7: typeTitle;
  8: typeTitle;
  9: typeTitle;
  10: typeTitle;
  11: typeTitle;
  12: typeTitle;
  13: typeTitle;
  14: typeTitle;
  15: typeTitle;
  16: typeTitle;
  17: typeTitle;
  18: typeTitle;
};
export function eightTeen() {
  return {
    1: Title(),
    2: Title(),
    3: Title(),
    4: Title(),
    5: Title(),
    6: Title(),
    7: Title(),
    8: Title(),
    9: Title(),
    10: Title(),
    11: Title(),
    12: Title(),
    13: Title(),
    14: Title(),
    15: Title(),
    16: Title(),
    17: Title(),
    18: Title(),
  };
}
