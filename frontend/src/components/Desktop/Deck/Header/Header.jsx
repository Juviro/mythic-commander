import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';

import Title from './Title';
import DeckImage from './DeckImage';
import DeckActions from './DeckActions';
import { Flex, DeckStats } from '../../../Elements/Shared';
import NotLegalWarning from '../../../Mobile/Deck/DeckHeader/DeckOverview/NotLegalWarning';

const StyledWrapper = styled(Flex)`
  height: 226px;
  width: 100%;
  padding: 16px;
  box-shadow: 0px 0px 4px 4px #d8d8d8;
`;

export default ({ deck }) => {
  if (!deck) {
    return (
      <StyledWrapper>
        <Skeleton />
      </StyledWrapper>
    );
  }
  return (
    <StyledWrapper direction="column">
      <Flex direction="row" justify="space-between" align="center">
        <Title deck={deck} />
        <NotLegalWarning deck={deck} size={26} />
      </Flex>
      <Flex direction="row" justify="space-between">
        <Flex direction="row">
          <DeckImage deck={deck} />
          <DeckStats deck={deck} />
        </Flex>
        <DeckActions deck={deck} />
      </Flex>
    </StyledWrapper>
  );
};
