import React from 'react';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';

import Table from '../../../Elements/CardView/Table';
import FullscreenSpinner from '../../../Elements/Spinner/FullscreenSpinner';
import { filterCards } from './cardFilter';

const OverviewWrapper = styled.div`
  width: calc(100% - 300px);
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  padding: 20px;
`;

export default ({ deck, loading }) => {
  const [filter] = useQueryParams({
    search: StringParam,
    colors: StringParam,
  });
  if (loading || !deck.cards) return <FullscreenSpinner />;

  console.log('TCL: deck.cards', deck.cards);
  const commander = deck.cards.find(({ zone }) => zone === 'COMMANDER');
  const filteredCards = filterCards(deck.cards, filter);

  return (
    <OverviewWrapper>
      <Table
        cards={filteredCards}
        commander={commander}
        displayedColumns={['types', 'prices', 'images', 'rarity', 'owned']}
        type="deck"
        noPagination
        markNonLegal
      />
    </OverviewWrapper>
  );
};
