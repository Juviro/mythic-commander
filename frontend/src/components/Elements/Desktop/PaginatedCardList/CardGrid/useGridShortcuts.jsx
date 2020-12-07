import { useEffect, useState, useContext } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';

import { useWindowSize } from 'components/Hooks';
import { isInputField, isModifierKey } from 'components/Hooks/useShortcut';
import keyCodes from '../../../../../constants/keyCodes';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';

export const CARD_WIDTH = 240;

export default (wrapperRef, toggleShowDetail, numberOfCards, blockShortcuts) => {
  useWindowSize();
  const [cardsPerRow, setCardsPerRow] = useState(6);
  const [currentPage = 1, setPageParam] = useQueryParam('page', NumberParam);
  const [pageSize, setPageSizeParam] = useQueryParam('pageSize', NumberParam);
  const [addedWithin] = useQueryParam('addedWithin', NumberParam);
  const { focusedElement } = useContext(FocusContext);
  const shortcutsActive =
    !focusedElement ||
    ['modal.cardDetails', 'deck.sidebar.add', 'deck.sidebar.wants'].includes(
      focusedElement
    );

  // eslint-disable-next-line
  useEffect(() => {
    if (!wrapperRef.current) return;
    const currentWidth = wrapperRef.current.offsetWidth;
    const newNumberOfCardsPerRow = Math.floor(currentWidth / CARD_WIDTH);
    if (newNumberOfCardsPerRow === cardsPerRow) return;

    setCardsPerRow(newNumberOfCardsPerRow);
  });

  useEffect(() => {
    setPageParam(1);
    // eslint-disable-next-line
  }, [addedWithin]);

  const numberOfRows = Math.ceil(pageSize / cardsPerRow);

  const setCurrentPage = (newPage, shouldReplace) =>
    setPageParam(newPage, shouldReplace ? 'replaceIn' : 'pushIn');
  const setPageSize = (newPageSize) => setPageSizeParam(newPageSize, 'replaceIn');

  const [selectedElementPosition, setSelectedElementPosition] = useState(0);

  const numberOfPages = Math.ceil(numberOfCards / pageSize) || 1;
  const cardsOnLastPage =
    numberOfPages === 1
      ? numberOfCards
      : numberOfCards % (pageSize * (numberOfPages - 1));

  useEffect(() => {
    if (numberOfPages === 1 || numberOfPages >= currentPage) return;
    setCurrentPage(numberOfPages, true);
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
        currentPage === numberOfPages && cardsOnLastPage === selectedElementPosition;
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
      const lastCardOnNextPage = willBeOnLastPage ? cardsOnLastPage : cardsPerRow;
      setSelectedElementPosition(
        Math.min(selectedElementPosition % cardsPerRow || cardsPerRow, lastCardOnNextPage)
      );
    } else {
      const nextPosition = Math.min(
        selectedElementPosition + cardsPerRow,
        pageSize || Infinity
      );
      const hasNoNext = currentPage === numberOfPages && nextPosition > cardsOnLastPage;
      if (hasNoNext) {
        const isLastPage = currentPage === numberOfPages;
        setSelectedElementPosition(isLastPage ? cardsOnLastPage : cardsPerRow);
      } else {
        setSelectedElementPosition(nextPosition);
      }
    }
  };

  const onKeyDown = (event) => {
    if (
      !numberOfCards ||
      !shortcutsActive ||
      isInputField(event) ||
      isModifierKey(event) ||
      blockShortcuts
    ) {
      return;
    }
    let preventDefault = true;

    switch (event.keyCode) {
      case keyCodes.SPACE:
        if (focusedElement !== 'modal.cardDetails') toggleShowDetail();
        break;
      case keyCodes.ARROW_LEFT:
        onLeft();
        break;
      case keyCodes.ARROW_RIGHT:
        onRight();
        break;
      case keyCodes.ARROW_UP:
        onUp();
        break;
      case keyCodes.ARROW_DOWN:
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
    const lastPosition = currentPage >= numberOfPages ? cardsOnLastPage : pageSize;
    setSelectedElementPosition(Math.min(selectedElementPosition, lastPosition));

    setCurrentPage(Math.max(Math.min(currentPage, numberOfPages), 1), true);
    // eslint-disable-next-line
  }, [numberOfPages]);

  useEffect(() => {
    setSelectedElementPosition(1);
  }, [currentPage]);

  const onChange = (newVal) => {
    setCurrentPage(newVal);
  };

  const pagination = {
    pageSize: pageSize || 10,
    current: currentPage,
    total: numberOfCards,
    onShowSizeChange: (_, newPageSize) => setPageSize(newPageSize),
    pageSizeOptions: ['10', '20', '50'],
    onChange,
  };

  return { pagination, selectedElementPosition, setSelectedElementPosition };
};
