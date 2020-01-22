import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';

import { getDeck } from '../../../queries/deck';
import CardList from './CardList/CardList';
import DeckHeader from './DeckHeader';

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
  console.log('deck :', data && data.deck);

  return (
    <StyledDeck>
      {loading ? (
        <Spin />
      ) : (
        <>
          <DeckHeader deck={data.deck} />
          <CardList deck={data.deck} />
        </>
      )}
    </StyledDeck>
  );
};
