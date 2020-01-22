import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';

import DeckImage from './DeckImage';
import DeckHeader from './DeckHeader';
import CardList from './CardList/CardList';
import { getDeck } from '../../../queries/deck';

const StyledDeck = styled.div`
  width: 100%;
  display: flex;
  min-height: 300px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { id } = useParams();
  const { data, loading } = useQuery(getDeck, { variables: { id } });

  return (
    <StyledDeck>
      {loading ? (
        <Spin />
      ) : (
        <>
          <DeckImage deck={data.deck} />
          <DeckHeader deck={data.deck} />
          <CardList deck={data.deck} />
        </>
      )}
    </StyledDeck>
  );
};
