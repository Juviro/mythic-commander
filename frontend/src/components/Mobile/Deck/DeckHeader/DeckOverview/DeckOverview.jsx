import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

import { ListStats } from 'components/Elements/Shared';
import NotLegalWarning from './NotLegalWarning';
import DeckName from './DeckName';

const StyledInfoBox = styled.div`
  width: 100%;
  padding: 16px;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export default ({ deck, loading }) => {
  if (loading) {
    return (
      <StyledInfoBox>
        <Skeleton active />
      </StyledInfoBox>
    );
  }

  const commander = deck.cards.find(({ isCommander }) => isCommander);

  return (
    <>
      <StyledInfoBox>
        <StyledHeader>
          <DeckName name={deck.name} commander={commander} />
          <NotLegalWarning deck={deck} />
        </StyledHeader>
        <ListStats list={deck} hideUnique style={{ marginTop: 16 }} />
      </StyledInfoBox>
    </>
  );
};
