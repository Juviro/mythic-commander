import React from 'react';
import styled from 'styled-components';
import NotLegalWarning from './NotLegalWarning';
import DeckName from './DeckName';
import { getNumberOfCards } from '../../../../../utils/deck';

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

const getPriceLabel = amountInEuro => {
  const formatPrice = amount =>
    Number(amount).toLocaleString('de-DE', {
      style: 'currency',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      currency: 'EUR',
    });

  return amountInEuro ? formatPrice(amountInEuro) : '-';
};

export default ({ deck }) => {
  const commander = deck.cards.find(({ zone }) => zone === 'COMMANDER');
  const numberOfUnowned = deck.cards.filter(({ owned }) => !owned).length;
  const numberOfCards = `${getNumberOfCards(deck.cards)} cards ${
    numberOfUnowned ? `(${numberOfUnowned} not owned)` : ''
  }`;
  const totalValue = (deck.cards || []).reduce(
    (acc, val) => acc + val.priceInEuro,
    0
  );
  const unownedValue = (deck.cards || []).reduce(
    (acc, val) => (val.owned ? acc : acc + val.priceInEuro),
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
