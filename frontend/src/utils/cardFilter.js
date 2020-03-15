import { filterByName } from '../components/Elements/SearchField/filterNames';

const filterByColor = (colorString = '') => ({ color_identity }) => {
  const [filteredColors] = colorString.match(/(w|u|b|r|g)+$/) || [''];
  const isExclude = colorString.includes('-');
  const isExact = colorString.includes('x');

  const checkForColor = color =>
    color && filteredColors.includes(color.toLowerCase());
  const someMatches = !filteredColors || color_identity.some(checkForColor);
  const onlySelected = !filteredColors.length
    ? !color_identity.length
    : color_identity.length && color_identity.every(checkForColor);

  const hasAllColors = filteredColors
    .split('')
    .every(cardColor => color_identity.includes(cardColor.toUpperCase()));

  if (isExact) return hasAllColors && onlySelected;
  if (isExclude) return onlySelected;
  return someMatches;
};

export const filterCards = (cards, { search, colors }) => {
  return filterByName(cards, search).filter(filterByColor(colors));
};
