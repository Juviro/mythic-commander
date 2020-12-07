export const roundValue = (value: number, precision = 0) => {
  const factor = 10 ** precision;

  return Math.round(value * factor) / factor;
};
