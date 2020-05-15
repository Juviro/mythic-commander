import React, { useContext } from 'react';
import { Skeleton, Empty } from 'antd';
import styled, { css } from 'styled-components';

import { useWindowSize } from '../../../../Hooks';
import { Flex } from '../../../../Elements/Shared';
import { CARD_WIDTH } from './CardList/Card';
import getCardsByType from '../../../../../utils/getCardsByType';
import CardLists from './CardLists';
import { sortByCmc, sortByName } from '../../../../../utils/cardFilter';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';
import { primary } from '../../../../../constants/colors';

const StyledWrapper = styled.div`
  margin: 8px;
  width: calc(100% - 16px);
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  min-height: 400px;

  ${({ isFocused }) =>
    isFocused
      ? css`
          box-shadow: 0 0 10px ${primary};
        `
      : ''}
`;

const getCardColumns = (cards, numberOfCols) => {
  if (!cards || numberOfCols === null) return [];

  const sortedCards = sortByCmc(sortByName(cards));
  const { cardsByType } = getCardsByType(sortedCards);
  const displayedCardsByType = cardsByType
    .filter(({ cards: _cards }) => _cards.length)
    .sort((a, b) => b.cards.length - a.cards.length);

  const columns = [];
  while (columns.length < numberOfCols) {
    columns.push([]);
  }

  const cardColumns = displayedCardsByType.reduce((acc, val) => {
    const columnWithLeastCards = acc
      .map((column, index) => ({
        height: column.reduce(
          // The 8 is is an offset for column title and fully displayed card
          (sum, { cards: columnCards }) => sum + columnCards.length + 8,
          0
        ),
        index,
      }))
      .sort((a, b) => a.height - b.height)[0].index;

    acc[columnWithLeastCards].push(val);
    return acc;
  }, columns);

  return cardColumns.filter(column => column.length);
};

export default ({ deck, loading, currentTab }) => {
  const widthOffset = currentTab ? 500 : 0;
  useWindowSize();
  const { focusedElement } = useContext(FocusContext);
  const isFocused = focusedElement === 'deck.cards';

  // padding of wrapper, tabs, tabMargin, wrapper margin, ???
  const innerWidth = window.innerWidth - widthOffset - 16 - 40 - 8 - 8 - 23;
  const cardWidth = CARD_WIDTH + 20; // padding and margin of card
  const numberOfCols = Math.max(Math.floor(innerWidth / cardWidth), 1);

  if (loading)
    return (
      <Flex style={{ margin: 16 }}>
        <Skeleton />
      </Flex>
    );

  const cardColumns = getCardColumns(deck.cards, numberOfCols);

  return (
    <StyledWrapper isFocused={isFocused}>
      <Flex
        direction="row"
        wrap="wrap"
        style={{ padding: 8, width: 'fit-content' }}
      >
        {cardColumns.length ? (
          <CardLists columns={cardColumns} deck={deck} />
        ) : (
          <Empty description="No Cards" />
        )}
      </Flex>
    </StyledWrapper>
  );
};
