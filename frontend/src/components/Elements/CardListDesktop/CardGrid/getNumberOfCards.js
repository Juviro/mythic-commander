// image, info
const CARD_HEIGHT = 360 + 42;
// image, padding
const CARD_WIDTH = 260 + 2 * 8;
// Navbar, Searchbar, Collection margin, pagination, StyledWrapper padding
const HEIGHT_OFFSET = 50 + 48 + 48 + 48 + 8;
// Collection margin
const WIDTH_OFFSET = 48;

export default widthOffset => {
  const { innerWidth, innerHeight } = window;
  const numberOfRows = Math.floor((innerHeight - HEIGHT_OFFSET) / CARD_HEIGHT);
  const cardsPerRow = Math.floor(
    (innerWidth - widthOffset - WIDTH_OFFSET) / CARD_WIDTH
  );

  return {
    CARD_HEIGHT,
    cardsPerRow: Math.max(cardsPerRow, 1),
    numberOfRows: Math.max(numberOfRows, 1),
  };
};
