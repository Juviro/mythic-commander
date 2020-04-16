import { useEffect, useState } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import { isInputField } from '../../../../Hooks/useShortcut';
import { useStoredQueryParam } from '../../../../Hooks';

const ENTER = 13;
const SPACE = 32;
const ARROW_LEFT = 37;
const ARROW_TOP = 38;
const ARROW_RIGHT = 39;
const ARROW_BOTTOM = 40;

export default (cardsPerRow, numberOfRows, toggleShowDetail, numberOfCards) => {
  const [currentPage = 1, setCurrentPage] = useQueryParam('page', NumberParam);
  const [pageSize, setPageSize] = useStoredQueryParam('pageSize', NumberParam);

  const [selectedElementPosition, setSelectedElementPosition] = useState(0);

  const numberOfPages = Math.ceil(numberOfCards / pageSize) || 1;
  const cardsOnLastPage =
    numberOfPages === 1
      ? numberOfCards
      : numberOfCards % (pageSize * (numberOfPages - 1));

  useEffect(() => {
    if (numberOfPages === 1 || numberOfPages >= currentPage) return;
    setCurrentPage(numberOfPages);
  });

  const onLeft = () => {
    if (selectedElementPosition === 1) {
      const nextPage = currentPage - 1;
      if (!nextPage) return;
      setCurrentPage(nextPage);
      setSelectedElementPosition(pageSize);
    } else {
      setSelectedElementPosition(selectedElementPosition - 1);
    }
  };
  const onRight = () => {
    if (selectedElementPosition === pageSize) {
      if (currentPage === numberOfPages) return;
      setCurrentPage(Math.min(currentPage + 1, numberOfPages));
      setSelectedElementPosition(1);
    } else {
      const isLastElementOnLastPage =
        currentPage === numberOfPages &&
        cardsOnLastPage === selectedElementPosition;
      if (isLastElementOnLastPage) return;
      setSelectedElementPosition(selectedElementPosition + 1);
    }
  };
  const onUp = () => {
    if (selectedElementPosition <= cardsPerRow) {
      const nextPage = currentPage - 1;
      if (!nextPage) return;
      setCurrentPage(nextPage);
      const newElementPosition = Math.min(
        cardsPerRow * (numberOfRows - 1) + selectedElementPosition,
        pageSize
      );
      setSelectedElementPosition(newElementPosition);
    } else {
      setSelectedElementPosition(selectedElementPosition - cardsPerRow);
    }
  };
  const onDown = () => {
    if (Math.ceil(selectedElementPosition / cardsPerRow) === numberOfRows) {
      if (currentPage === numberOfPages) return;
      const willBeOnLastPage = currentPage + 1 === numberOfPages;
      setCurrentPage(Math.min(currentPage + 1, numberOfPages));
      const lastCardOnLastPage = willBeOnLastPage
        ? cardsOnLastPage
        : cardsPerRow;
      setSelectedElementPosition(
        Math.min(
          selectedElementPosition % cardsPerRow || cardsPerRow,
          lastCardOnLastPage
        )
      );
    } else {
      const nextPosition = Math.min(
        selectedElementPosition + cardsPerRow,
        pageSize
      );
      const hasNoNext =
        currentPage === numberOfPages && nextPosition > cardsOnLastPage;
      if (hasNoNext) return;

      setSelectedElementPosition(nextPosition);
    }
  };

  const onKeyDown = event => {
    if (!numberOfCards || isInputField(event)) return;
    let preventDefault = true;

    switch (event.keyCode) {
      case ENTER:
      case SPACE:
        toggleShowDetail();
        break;
      case ARROW_LEFT:
        onLeft();
        break;
      case ARROW_RIGHT:
        onRight();
        break;
      case ARROW_TOP:
        onUp();
        break;
      case ARROW_BOTTOM:
        onDown();
        break;
      default:
        preventDefault = false;
        break;
    }
    if (preventDefault) event.preventDefault();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false);
    return () => document.removeEventListener('keydown', onKeyDown, false);
  });

  useEffect(() => {
    if (!numberOfCards || !numberOfPages) return;
    const lastPosition =
      currentPage >= numberOfPages ? cardsOnLastPage : pageSize;
    setSelectedElementPosition(Math.min(selectedElementPosition, lastPosition));

    setCurrentPage(Math.max(Math.min(currentPage, numberOfPages), 1));
    // eslint-disable-next-line
  }, [numberOfPages]);

  useEffect(() => {
    setSelectedElementPosition(1);
  }, [currentPage]);

  const pagination = {
    pageSize: pageSize || 10,
    current: currentPage,
    total: numberOfCards,
    onShowSizeChange: (_, newPageSize) => setPageSize(newPageSize),
    pageSizeOptions: [10, 25, 50, 100],
    onChange: val => setCurrentPage(val),
  };

  return { pagination, selectedElementPosition, setSelectedElementPosition };
};
