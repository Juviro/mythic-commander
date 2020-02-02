import React, { useState } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery } from 'react-apollo';

import DeckHeader from './DeckHeader';
import DeckMenu from './DeckMenu';
import DeckBody from './DeckBody';
import AddCard from './AddCard';
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
  const [currentTab, setCurrentTab] = useState('cards');
  const { data, loading } = useQuery(getDeck, { variables: { id } });
  console.log('data :', data && data.deck);

  return (
    <StyledDeck>
      {loading ? (
        <Spin />
      ) : (
        <>
          <DeckHeader deck={data.deck} />
          <DeckMenu
            deck={data.deck}
            currentTab={currentTab}
            onSetTab={setCurrentTab}
          />
          <DeckBody deck={data.deck} currentTab={currentTab} />
        </>
      )}
      <AddCard />
    </StyledDeck>
  );
};
