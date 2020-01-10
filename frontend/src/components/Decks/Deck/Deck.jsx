import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';

import { getDeck } from '../../../queries/deck';

import LeftSidebar from './LeftSidebar';
import DeckOverview from './DeckOverview';

const StyledDeck = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 49px);
  justify-content: flex-start;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(getDeck, { variables: { id } });

  return (
    <StyledDeck>
      <LeftSidebar deckId={id} />
      <DeckOverview deck={data && data.deck} loading={loading} />
    </StyledDeck>
  );
};
