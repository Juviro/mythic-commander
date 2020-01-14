import { filterCards as filterByName } from '../../../Elements/SearchField/filterNames';

const filterByColor = (colorString = '') => card => {
  const [colors] = colorString.match(/(w|u|b|r|g)+$/) || [''];
  const isExclude = colorString.includes('-');
  const isExact = colorString.includes('x');

  const cardFaces = card.card_faces || [card];
  const allCardColors = cardFaces.reduce((acc, val) => acc.concat(val.color_identity), []);

  const checkForColor = color => color && colors.includes(color.toLowerCase());
  const someMatches = !colors || allCardColors.some(checkForColor);
  const onlySelected = !colors.length
    ? !allCardColors.length
    : allCardColors.length && allCardColors.every(checkForColor);

  const hasAllColors = colors.split('').every(cardColor => allCardColors.includes(cardColor.toUpperCase()));

  if (isExact) return hasAllColors && onlySelected;
  if (isExclude) return onlySelected;
  return someMatches;
};

export const filterCards = (cards, { search, colors }) => {
  return filterByName(cards, search).filter(filterByColor(colors));
};
