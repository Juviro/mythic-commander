import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import Flex from '../../Shared/Flex';
import CardTable from './CardTable';
import CardGrid from './CardGrid';
import { LayoutPicker } from '../../Shared';
import Header from './Header';

export default ({
  cards,
  loading,
  widthOffset,
  numberOfCards,
  showSorter,
  hiddenColumns,
}) => {
  const [layout] = useQueryParam('layout', StringParam);

  const cardList =
    layout === 'list' ? (
      <CardTable
        showSorter={showSorter}
        hiddenColumns={hiddenColumns}
        cards={cards}
        loading={loading}
        numberOfCards={numberOfCards}
      />
    ) : (
      <CardGrid
        cards={cards}
        loading={loading}
        widthOffset={widthOffset}
        numberOfCards={numberOfCards}
      />
    );

  return (
    <Flex
      direction="column"
      style={{ width: '100%', height: '100%', padding: 24 }}
    >
      <Header />
      {(loading || cards) && cardList}
    </Flex>
  );
};
