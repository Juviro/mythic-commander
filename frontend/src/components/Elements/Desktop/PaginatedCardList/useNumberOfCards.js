import { NumberParam, useQueryParam } from 'use-query-params';
import { useWindowSize } from '../../../Hooks';

// image
const CARD_WIDTH = 210;
// Parent margin
const WIDTH_OFFSET = 48;

export default (widthOffset = 0, zoom) => {
  useWindowSize();
  const [pageSize] = useQueryParam('pageSize', NumberParam);
  const availableWidth = window.innerWidth - widthOffset - WIDTH_OFFSET;

  const cardWidth = (zoom / 100) * CARD_WIDTH || 1;
  const cardWidthWithPadding = cardWidth + 2 * 8;

  const cardsPerRow = Math.floor(availableWidth / cardWidthWithPadding);
  const numberOfRows = Math.ceil(pageSize / cardsPerRow);

  return {
    cardWidth,
    cardsPerRow: Math.max(cardsPerRow, 1),
    numberOfRows: Math.max(numberOfRows, 1),
  };
};
