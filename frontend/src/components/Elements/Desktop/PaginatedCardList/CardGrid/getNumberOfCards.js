// image, margin
const CARD_HEIGHT = 292 + 2 * 8;
// image, padding
const CARD_WIDTH = 210 + 2 * 8;
// Navbar, Searchbar, Collection margin, pagination, StyledWrapper padding
const HEIGHT_OFFSET = 50 + 48 + 48 + 48 + 8;
// Collection margin
const WIDTH_OFFSET = 48;

export default (widthOffset = 0) => {
  const { innerWidth, innerHeight } = window;
  const numberOfRows = Math.floor((innerHeight - HEIGHT_OFFSET) / CARD_HEIGHT);
  const cardsPerRow = Math.floor(
    (innerWidth - widthOffset - WIDTH_OFFSET) / CARD_WIDTH
  );

  return {
    cardsPerRow: Math.max(cardsPerRow, 1),
    numberOfRows: Math.max(numberOfRows, 1),
  };
};
