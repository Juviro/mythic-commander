import { useEffect, useState } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import { isInputField } from '../../Hooks/useShortcut';

const ENTER = 13;
const SPACE = 32;
const ARROW_LEFT = 37;
const ARROW_TOP = 38;
const ARROW_RIGHT = 39;
const ARROW_BOTTOM = 40;

export default (cards, toggleShowDetail) => {
  const pageSize = Math.floor((window.innerHeight - 210) / 74);
  const [currentPage = 1, setCurrentPage] = useQueryParam('page', NumberParam);
  const [selectedElementPosition, setSelectedElementPosition] = useState(0);

  const numberOfCards = cards && cards.length;

  const numberOfPages = cards && Math.ceil(cards.length / pageSize);

  const onLeft = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };
  const onRight = () => {
    setCurrentPage(Math.min(currentPage + 1, numberOfPages));
  };
  const onUp = () => {
    if (selectedElementPosition === 1) {
      onLeft();
      if (currentPage !== 1) setSelectedElementPosition(pageSize);
    } else {
      setSelectedElementPosition(selectedElementPosition - 1);
    }
  };
  const onDown = () => {
    if (selectedElementPosition === pageSize) {
      onRight();
    } else {
      const elementsOnCurrentPage =
        currentPage === numberOfPages ? numberOfCards % pageSize : pageSize;
      setSelectedElementPosition(
        Math.min(selectedElementPosition + 1, elementsOnCurrentPage)
      );
    }
  };

  const onKeyDown = event => {
    if (!cards || isInputField(event)) return;
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
    if (!cards) return;
    setCurrentPage(Math.max(Math.min(currentPage, numberOfPages), 1));
    // eslint-disable-next-line
  }, [numberOfCards]);

  useEffect(() => {
    setSelectedElementPosition(1);
  }, [currentPage]);

  const pagination = {
    pageSize,
    current: currentPage,
    onChange: val => setCurrentPage(val),
  };

  return { pagination, selectedElementPosition, setSelectedElementPosition };
};
