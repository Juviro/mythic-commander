import React from 'react';
import styled from 'styled-components';
import NotLegalWarning from './NotLegalWarning';

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

const StyledTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  const numberOfCards = `${deck.numberOfCards} cards ${numberOfUnowned ? `(${numberOfUnowned} not owned)` : ''}`;
  const totalValue = (deck.cards || []).reduce((acc, val) => acc + val.priceInEuro, 0);
  const unownedValue = (deck.cards || []).reduce((acc, val) => (val.owned ? acc : acc + val.priceInEuro), 0);

  return (
    <>
      <StyledInfoBox>
        <StyledHeader>
          <StyledTitle>{deck.name}</StyledTitle>
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
