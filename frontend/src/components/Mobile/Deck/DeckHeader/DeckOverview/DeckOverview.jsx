import React from 'react';
import styled from 'styled-components';
import { Divider, Skeleton, Space } from 'antd';

import { DeckQuickstats } from 'components/Elements/Shared';
import DeckName from './DeckName';

const StyledInfoBox = styled(Space)`
  width: 100%;
  padding: 16px;
`;

const StyledDivider = styled(Divider)`
  && {
    margin-bottom: 0px !important;
  }
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
    <StyledInfoBox direction="vertical">
      <DeckName name={deck.name} commander={commander} />
      <DeckQuickstats deck={deck} />
      <StyledDivider />
    </StyledInfoBox>
  );
};
