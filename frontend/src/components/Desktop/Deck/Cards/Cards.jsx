import React, { useContext, useEffect, useRef, useState } from 'react';
import { Skeleton, Empty, Button } from 'antd';
import styled, { css } from 'styled-components';
import { debounce } from 'lodash';

import useNumberOfCols, {
  MAX_COLUMNS,
} from 'components/Desktop/Deck/Cards/useNumberOfCols';
import { Flex } from '../../../Elements/Shared';
import getCardsByType from '../../../../utils/getCardsByType';
import CardLists from './CardLists';
import { sortByCmc, sortByName } from '../../../../utils/cardFilter';
import FocusContext from '../../../Provider/FocusProvider/FocusProvider';
import { primary } from '../../../../constants/colors';
import { Dropzone } from '../../../Elements/Desktop';

const StyledWrapper = styled.div`
  margin: 8px;
  width: calc(100% - 16px);
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  min-height: 400px;
  height: ${({ height }) => height}px;

  ${({ isFocused }) =>
    isFocused
      ? css`
          box-shadow: 0 0 10px ${primary};
        `
      : ''}
`;

const sumHeight = (column) =>
  column.reduce((sum, current) => {
    const CARD_HEIGHT = 86;
    const ELEMENT_HEIGHT = 53;
    return sum + CARD_HEIGHT + ELEMENT_HEIGHT * current.cards.length;
  }, 0);

const getColumnOrder = (cardsByType, numberOfCols) => {
  const displayedCardsByType = cardsByType.sort((a, b) => {
    if (a.type === 'Commander') return -1;
    if (b.type === 'Commander') return 1;
    return b.cards.length - a.cards.length;
  });

  const columns = [];
  while (columns.length < numberOfCols) {
    columns.push([]);
  }

  const cardColumns = displayedCardsByType.reduce((acc, val) => {
    const columnWithLeastCards = acc
      .map((column, index) => ({
        height: sumHeight(column),
        index,
      }))
      .sort((a, b) => a.height - b.height)[0].index;

    acc[columnWithLeastCards].push(val);
    return acc;
  }, columns);

  return cardColumns
    .filter((column) => column.length)
    .map((block) => block.map(({ type }) => type));
};

export default ({ deck, loading, currentTab, onAddCards, displayOwnedOnly }) => {
  const { focusedElement } = useContext(FocusContext);
  const isFocused = focusedElement === 'deck.cards';

  const [columnOrder, setColumnOrder] = useState(null);

  const [isSmall, setIsSmall] = useState(false);
  const debounceRef = useRef(debounce(setColumnOrder, 100));

  const wrapperRef = useRef(null);
  const { numberOfCols } = useNumberOfCols(wrapperRef);

  const sortedCards = deck && sortByCmc(sortByName(deck.cards));
  const cardsByType = deck && getCardsByType(sortedCards).cardsByType;

  const cardColumns =
    columnOrder &&
    columnOrder.map((column) =>
      column.map((typeName) => cardsByType.find(({ type }) => type === typeName))
    );

  const getWrapperHeight = () => {
    if (!cardColumns) return null;

    return Math.max(...cardColumns.map(sumHeight));
  };

  const wrapperHeight = getWrapperHeight();

  // re-calculate the column order every time the number of cols changes
  // debounced so a fast resizing animation doesn't trigger multiple times
  // (e.g. going from 4 to 2 cols)
  useEffect(() => {
    if (numberOfCols) {
      const newColumnOrder = getColumnOrder(cardsByType, numberOfCols);
      if (!columnOrder) {
        setColumnOrder(newColumnOrder);
      } else {
        debounceRef.current(newColumnOrder);
      }
    }

    return debounceRef.current.cancel;
  }, [numberOfCols]);

  if (loading)
    return (
      <Flex style={{ margin: 16 }}>
        <Skeleton />
      </Flex>
    );

  const onDrop = ({ id, name, amount = 1 }) => {
    onAddCards([{ id, amount }], name);
  };

  return (
    <>
      <Button onClick={() => setIsSmall(!isSmall)}>Toggle Width</Button>
      <StyledWrapper
        isFocused={isFocused}
        ref={wrapperRef}
        height={wrapperHeight}
        style={{ width: isSmall ? 800 : undefined }}
      >
        <Dropzone onDrop={onDrop} listId={deck.id}>
          {cardColumns ? (
            <Flex
              direction="row"
              wrap="wrap"
              style={{ padding: 8, height: wrapperHeight }}
            >
              <CardLists
                columns={cardColumns}
                deck={deck}
                displayOwnedOnly={displayOwnedOnly}
              />
            </Flex>
          ) : (
            <Flex
              justify="center"
              align="center"
              style={{ width: '100%', marginTop: 120 }}
            >
              <Empty description="No Cards" />
            </Flex>
          )}
        </Dropzone>
      </StyledWrapper>
    </>
  );
};
