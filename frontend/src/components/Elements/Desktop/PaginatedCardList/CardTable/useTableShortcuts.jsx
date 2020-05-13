import { useEffect, useState } from 'react';
import { useQueryParam, NumberParam, BooleanParam } from 'use-query-params';
import { isInputField, isModifierKey } from '../../../../Hooks/useShortcut';
import { useWindowSize } from '../../../../Hooks';
import keyCodes from '../../../../../constants/keyCodes';

export default (numberOfCards, toggleShowDetail, toggleElementSelection) => {
  useWindowSize();
  const [isBlocked] = useQueryParam('blockShortcuts', BooleanParam);
  const [currentPage = 1, setPageParam] = useQueryParam('page', NumberParam);
  const [pageSize, setPageSizeParam] = useQueryParam('pageSize', NumberParam);
  const [selectedElementPosition, setSelectedElementPosition] = useState(0);

  const setCurrentPage = (newPage, shouldReplace) =>
    setPageParam(newPage, shouldReplace ? 'replaceIn' : 'pushIn');
  const setPageSize = newPageSize => setPageSizeParam(newPageSize, 'pushIn');

  const numberOfPages = numberOfCards ? Math.ceil(numberOfCards / pageSize) : 1;

  useEffect(() => {
    if (numberOfPages === 1 || numberOfPages >= currentPage) return;
    setCurrentPage(numberOfPages, true);
  });

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
        currentPage === numberOfPages
          ? numberOfCards % pageSize || pageSize
          : pageSize;
      setSelectedElementPosition(
        Math.min(selectedElementPosition + 1, elementsOnCurrentPage)
      );
    }
  };

  const onKeyDown = event => {
    if (
      !numberOfCards ||
      isInputField(event) ||
      isModifierKey(event) ||
      isBlocked
    )
      return;
    let preventDefault = true;

    switch (event.keyCode) {
      case keyCodes.SPACE:
        toggleElementSelection(selectedElementPosition);
        break;
      case keyCodes.ENTER:
        toggleShowDetail();
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
    if (!numberOfCards) return;
    setCurrentPage(Math.max(Math.min(currentPage, numberOfPages), 1), true);
    // eslint-disable-next-line
  }, [numberOfCards]);

  useEffect(() => {
    setSelectedElementPosition(1);
  }, [currentPage]);

  const pagination = {
    pageSize,
    current: currentPage,
    total: numberOfCards,
    onShowSizeChange: (_, newPageSize) => setPageSize(newPageSize),
    pageSizeOptions: [10, 25, 50, 100],
    onChange: val => setCurrentPage(val),
  };

  return { pagination, selectedElementPosition, setSelectedElementPosition };
};
