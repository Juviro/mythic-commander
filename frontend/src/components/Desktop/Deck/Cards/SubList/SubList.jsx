import React from 'react';
import styled from 'styled-components';

import { List } from 'antd';
import {
  CardGrid,
  PaginatedCardList,
  WithActions,
  WithFullList,
} from 'components/Elements/Desktop';
import Card from './Card';
import sumCardAmount from '../../../../../utils/sumCardAmount';
import { getPriceLabel } from '../../../../../utils/cardStats';
import { Flex } from '../../../../Elements/Shared';
// import { MIN_COLUMN_WIDTH } from '../useNumberOfCols';

const StyledWrapper = styled.div`
  padding: 6px;
  margin: 4px 4px 16px;
  position: relative;
  box-shadow: 0px 0px 4px 0px #b3b3b3;
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
    <>
      <h2>{title}</h2>
      <CardGrid
        hidePagination
        cards={cards}
        // loading={loading}
        showAddedBeforeFilter
        showCollectionFilters
        orderByParamName="orderByAdvanced"
      />
    </>
  );
};
