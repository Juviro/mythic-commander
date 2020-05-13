import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import { sortByCmc } from '../../../../../../utils/cardFilter';
import sumCardAmount from '../../../../../../utils/sumCardAmount';
import { getPriceLabel } from '../../../../../../utils/cardStats';
import { Flex } from '../../../../../Elements/Shared';

const StyledWrapper = styled.div`
  padding: 6px;
  margin: 4px 4px 16px;
  border-radius: 8px;
  position: relative;
  width: fit-content;
`;

export default ({
  type,
  cards,
  selectedCardId,
  onOpenDetails,
  setSelectedCardId,
}) => {
  const sortedCards = sortByCmc(cards);
  const nameSuffix =
    type !== 'Commander' || cards.length !== 1
      ? `(${sumCardAmount(cards)})`
      : '';
  const title = `${type} ${nameSuffix}`;
  const value = cards.reduce(
    (acc, { minPrice, amount }) => acc + amount * minPrice,
    0
  );
  const valueLabel = getPriceLabel(value, { round: true });

  return (
    <>
      <StyledWrapper direction="column">
        <Flex
          justify="space-between"
          style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}
        >
          <span>{title}</span>
          <span>{valueLabel}</span>
        </Flex>
        <div style={{ position: 'relative', height: '100%' }}>
          {sortedCards.map(card => (
            <Card
              card={card}
              key={card.id}
              setSelectedCardId={setSelectedCardId}
              onOpenDetails={onOpenDetails}
              isSelected={selectedCardId === card.id}
            />
          ))}
        </div>
      </StyledWrapper>
    </>
  );
};
