import React, { useRef, useEffect, useState } from 'react';
import { Skeleton } from 'antd';

import { useWindowSize } from '../../../../Hooks';
import { Flex } from '../../../../Elements/Shared';
import { CARD_WIDTH } from './CardList/Card';
import getCardsByType from '../../../../../utils/getCardsByType';
import CardLists from './CardLists';

const getCardColumns = (cards, numberOfCols) => {
  if (!cards || numberOfCols === null) return [];

  const { cardsByType } = getCardsByType(cards);
  const displayedCardsByType = cardsByType
    .filter(({ cards: _cards }) => _cards.length)
    .sort((a, b) => b.cards.length - a.cards.length);

  const columns = [];
  while (columns.length < numberOfCols) {
    columns.push([]);
  }

  return displayedCardsByType.reduce((acc, val) => {
    const columnWithLeastCards = acc
      .map((column, index) => ({
        numberOfCards: column.reduce(
          // The 8 is is an offset for column title and fully displayed card
          (sum, { cards: columnCards }) => sum + columnCards.length + 8,
          0
        ),
        index,
      }))
      .sort((a, b) => a.numberOfCards - b.numberOfCards)[0].index;

    acc[columnWithLeastCards].push(val);
    return acc;
  }, columns);
};

export default ({ deck, loading }) => {
  useWindowSize();
  const wrapperRef = useRef(null);
  const [numberOfCols, setNumberOfCols] = useState(null);

  // eslint-disable-next-line
  useEffect(() => {
    if (!wrapperRef.current) return;
    const innerWidth = wrapperRef.current.offsetWidth - 16; // - padding of wrapper
    if (!innerWidth) return;
    const cardWidth = CARD_WIDTH + 20; // padding and margin of card
    const newNumberOfCols = Math.max(Math.floor(innerWidth / cardWidth), 1);
    setNumberOfCols(newNumberOfCols);
  });

  if (loading)
    return (
      <Flex style={{ margin: 16 }}>
        <Skeleton />
      </Flex>
    );

  const cardColumns = getCardColumns(deck.cards, numberOfCols);

  return (
    <Flex
      justify="center"
      style={{ width: '100%', paddingBottom: 300 }}
      ref={wrapperRef}
    >
      <Flex
        direction="row"
        wrap="wrap"
        style={{ padding: 8, width: 'fit-content' }}
      >
        <CardLists columns={cardColumns} deck={deck} />
      </Flex>
    </Flex>
  );
};
