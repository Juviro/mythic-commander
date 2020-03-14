import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';

import { getDecks } from '../../../queries';
import DeckList from './DeckList';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { data, loading } = useQuery(getDecks);
  const decks = data ? data.decks : [];

  return (
    <StyledWrapper>
      {loading && !decks.length ? <Spin /> : <DeckList decks={decks} />}
    </StyledWrapper>
  );
};
