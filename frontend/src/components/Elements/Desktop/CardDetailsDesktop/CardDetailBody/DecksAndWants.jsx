import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

import IncludedDecks from 'components/Elements/Shared/IncludedDecks';
import IncludedWants from 'components/Elements/Shared/IncludedWants';
import FriendsCollection from 'components/Elements/Shared/FriendsCollection/FriendsCollection';
import Flex from 'components/Elements/Shared/Flex';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  margin-bottom: 16px;
  flex: 1;
`;

const DecksAndWants = ({ card, loading, selectedCardId, setSelectedCardId }) => {
  return (
    <Flex style={{ width: '100%', minHeight: 240 }} gap={24}>
      <StyledWrapper>
        <Divider>Your Decks</Divider>
        <IncludedDecks card={card} large loading={loading} />
      </StyledWrapper>
      <StyledWrapper>
        <Divider>Your Wants Lists</Divider>
        <IncludedWants card={card} large cardId={card.id} loading={loading} />
      </StyledWrapper>
      <StyledWrapper>
        <FriendsCollection
          oracle_id={card.oracle_id}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      </StyledWrapper>
    </Flex>
  );
};

export default DecksAndWants;
