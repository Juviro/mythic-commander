import { useEffect, useState } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import { isInputField } from '../../../Hooks/useShortcut';

const ENTER = 13;
const SPACE = 32;
const ARROW_LEFT = 37;
const ARROW_TOP = 38;
const ARROW_RIGHT = 39;
const ARROW_BOTTOM = 40;

export default (cardsPerRow, numberOfRows, toggleShowDetail, numberOfCards) => {
  const [currentPage = 1, setCurrentPage] = useQueryParam('page', NumberParam);
  const [selectedElementPosition, setSelectedElementPosition] = useState(0);

  const cardsPerPage = cardsPerRow * numberOfRows;
  const numberOfPages = Math.ceil(numberOfCards / cardsPerPage);
  const cardsOnLastPage = numberOfCards % (cardsPerPage * (numberOfPages - 1));

  const onLeft = () => {
    if (selectedElementPosition === 1) {
      const nextPage = currentPage - 1;
      if (!nextPage) return;
      setCurrentPage(nextPage);
      setSelectedElementPosition(cardsPerPage);
    } else {
      setSelectedElementPosition(selectedElementPosition - 1);
    }
  };
  const onRight = () => {
    if (selectedElementPosition === cardsPerPage) {
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
      setSelectedElementPosition(
        cardsPerRow * (numberOfRows - 1) + selectedElementPosition
      );
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
      const nextPosition = selectedElementPosition + cardsPerRow;
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
    setCurrentPage(Math.max(Math.min(currentPage, numberOfPages), 1));
    // eslint-disable-next-line
  }, [numberOfPages]);

  useEffect(() => {
    setSelectedElementPosition(1);
  }, [currentPage]);

  const pagination = {
    pageSize: cardsPerPage,
    current: currentPage,
    total: numberOfCards,
    onChange: val => setCurrentPage(val),
  };

  return { pagination, selectedElementPosition, setSelectedElementPosition };
};
