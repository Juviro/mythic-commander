export const isCatOrDog = (card: { type_line: string }) => {
  const types = card.type_line.split(' ');
  return types.includes('Cat') || types.includes('Dog');
};
