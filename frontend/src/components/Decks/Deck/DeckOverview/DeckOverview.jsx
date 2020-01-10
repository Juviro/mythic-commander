import React from 'react';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';

import Table from '../../../Elements/CardView/Table';
import FullscreenSpinner from '../../../Elements/Spinner/FullscreenSpinner';
import { filterCards as filterCardsByName } from '../../../Elements/SearchField/filterNames';

const OverviewWrapper = styled.div`
  width: calc(100% - 300px);
  height: 100%;
  display: flex;
  padding: 20px;
`;

const filterCards = (cards, { search }) => {
  return filterCardsByName(cards, search);
};

export default ({ deck, loading }) => {
  const [filter] = useQueryParams({
    search: StringParam,
  });
  if (loading || !deck.cards) return <FullscreenSpinner />;

  const filteredCards = filterCards(deck.cards, filter);

  return (
    <OverviewWrapper>
      <Table
        cards={filteredCards}
        displayedColumns={['types', 'prices', 'images', 'rarity']}
        type="deck"
        noPagination
      />
    </OverviewWrapper>
  );
};
