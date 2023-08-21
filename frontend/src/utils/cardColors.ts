export const getFullColor = (colorLetter: string) => {
  switch (colorLetter) {
    case 'W':
      return 'White';
    case 'U':
      return 'Blue';
    case 'B':
      return 'Black';
    case 'R':
      return 'Red';
    case 'G':
      return 'Green';
    case 'C':
      return 'Colorless';
    default:
      return colorLetter;
  }
};

const COLOR_ORDER = 'WUBRGC';

export const sortByColor = (a: string, b: string) => {
  return COLOR_ORDER.indexOf(b) - COLOR_ORDER.indexOf(a);
};

export const getSymbolFromColor = (color: string) => {
  return color === 'Blue' ? 'U' : color.slice(0, 1);
};
