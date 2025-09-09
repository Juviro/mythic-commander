const getRomanNumeral = (number: number) => {
  if (number > 10) return '∞';
  if (!Number.isFinite(number)) return '';

  const n = Math.floor(number);
  if (n <= 0) return '';

  let remaining = number;
  let result = '';

  const romanMap: Array<{ value: number; numeral: string }> = [
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];

  // eslint-disable-next-line no-restricted-syntax
  for (const { value, numeral } of romanMap) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
};

export default getRomanNumeral;
