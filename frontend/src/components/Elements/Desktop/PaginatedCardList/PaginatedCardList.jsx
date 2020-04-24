import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import Flex from '../../Shared/Flex';
import CardTable from './CardTable';
import CardGrid from './CardGrid';
import Header from './Header';
import FullscreenSpinner from '../../Shared/Spinner';

export default ({
  cards,
  loading,
  widthOffset,
  numberOfCards,
  showSorter,
  hiddenColumns,
}) => {
  const [layout] = useQueryParam('layout', StringParam);
  const width = `calc(100% - ${widthOffset}px)`;
  const showCardList = Boolean(cards.length);

  const cardList =
    layout === 'list' ? (
      <CardTable
        cards={cards}
        loading={loading}
        showSorter={showSorter}
        hiddenColumns={hiddenColumns}
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
      style={{
        width,
        overflowY: 'auto',
        padding: 24,
        transition: 'width 0.2s',
      }}
    >
      <Header showZoomSlider={layout === 'grid'} />
      {showCardList ? cardList : loading && <FullscreenSpinner />}
    </Flex>
  );
};
