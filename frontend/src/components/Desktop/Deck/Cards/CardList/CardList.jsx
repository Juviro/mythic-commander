import React from 'react';
import styled from 'styled-components';

import { List } from 'antd';
import Card from './Card';
import sumCardAmount from '../../../../../utils/sumCardAmount';
import { getPriceLabel } from '../../../../../utils/cardStats';
import { Flex } from '../../../../Elements/Shared';
import { MIN_COLUMN_WIDTH } from '../useNumberOfCols';

const StyledWrapper = styled.div`
  padding: 6px;
  margin: 4px 4px 16px;
  position: relative;
  box-shadow: 0px 0px 4px 0px #b3b3b3;
  min-width: ${MIN_COLUMN_WIDTH}px;
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
  if (!cards.length) return null;

  const nameSuffix =
    type !== 'Commander' || cards.length !== 1 ? `(${sumCardAmount(cards)})` : '';
  const title = `${type} ${nameSuffix}`;
  const value = cards.reduce((acc, { minPrice, amount }) => acc + amount * minPrice, 0);
  const valueLabel = getPriceLabel(Math.ceil(value), { round: true });

  return (
    <StyledWrapper>
      <Flex
        justify="space-between"
        style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}
      >
        <span>{title}</span>
        <span>{valueLabel}</span>
      </Flex>
      <List>
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
      </List>
    </StyledWrapper>
  );
};
