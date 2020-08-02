import React from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';
import NotLegalWarning from './NotLegalWarning';
import DeckName from './DeckName';
import { getPriceLabel } from '../../../../../utils/cardStats';
import sumCardAmount from '../../../../../utils/sumCardAmount';

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

const StyledStat = styled.div`
  font-size: 12px;
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
  const numberOfUnowned = deck.cards.filter(({ owned }) => !owned).length;
  const numberOfCards = `${sumCardAmount(deck.cards)} cards ${
    numberOfUnowned ? `(${numberOfUnowned} not owned)` : ''
  }`;
  const totalValue = (deck.cards || []).reduce((acc, val) => acc + val.minPrice, 0);
  const unownedValue = (deck.cards || []).reduce(
    (acc, val) => (val.owned ? acc : acc + val.minPrice),
    0
  );

  return (
    <>
      <StyledInfoBox>
        <StyledHeader>
          <DeckName name={deck.name} commander={commander} />
          <NotLegalWarning deck={deck} />
        </StyledHeader>
        <StyledStat>{numberOfCards}</StyledStat>
        <StyledStat>{commander && commander.name}</StyledStat>
        <StyledStat>{`Total value: ${getPriceLabel(totalValue)}${
          unownedValue ? ` (${getPriceLabel(unownedValue)} not owned)` : ''
        }`}</StyledStat>
      </StyledInfoBox>
    </>
  );
};
