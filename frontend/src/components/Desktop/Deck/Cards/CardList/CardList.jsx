import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import sumCardAmount from '../../../../../utils/sumCardAmount';
import { getPriceLabel } from '../../../../../utils/cardStats';
import { Flex } from '../../../../Elements/Shared';

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
  setSelectedCardOracleId,
  onDelete,
  displayOwnedOnly,
  onDeleteImmediately,
}) => {
  const nameSuffix =
    type !== 'Commander' || cards.length !== 1 ? `(${sumCardAmount(cards)})` : '';
  const title = `${type} ${nameSuffix}`;
  const value = cards.reduce((acc, { minPrice, amount }) => acc + amount * minPrice, 0);
  const valueLabel = getPriceLabel(Math.ceil(value), { round: true });

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
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              isSelected={selectedCardId === card.id}
              displayOwnedOnly={displayOwnedOnly}
              onDelete={onDelete}
              onOpenDetails={onOpenDetails}
              onDeleteImmediately={onDeleteImmediately}
              setSelectedCardOracleId={setSelectedCardOracleId}
            />
          ))}
        </div>
      </StyledWrapper>
    </>
  );
};
