import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import FoilIcon from 'components/Elements/Shared/FoilIcon';
import Set from '../Set';
import EditableAmount from '../EditableAmount';
import getIsMobile from '../../../../utils/isMobile';
import { getPriceLabel } from '../../../../utils/cardStats';

const StyledPriceWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 764px) {
    font-size: 12px;
  }
`;

const renderSet = (card) => {
  const isFoilOnly = !card.nonfoil;
  return (
    <Flex align="center">
      <Set setKey={card.set} name={card.set_name} />
      {isFoilOnly && (
        <FoilIcon
          style={{
            margin: 0,
            right: -1,
            position: 'absolute',
            zIndex: 99,
          }}
          tooltip="Only available in foil"
        />
      )}
    </Flex>
  );
};

const renderPrice = (currency) => (cardPrice) => {
  const price = cardPrice[currency];
  const foilPrice = cardPrice[`${currency}_foil`];

  const foilPriceLabel = getPriceLabel(foilPrice, { currency });
  const priceLabel = getPriceLabel(price, { currency });

  const displayFoil = Boolean(foilPrice && !price);

  const tooltip = (
    <Flex direction="row">
      <Flex direction="column" style={{ marginRight: 8 }}>
        <span>Regular:</span>
        <span>Foil: </span>
      </Flex>
      <Flex direction="column">
        <span>{priceLabel}</span>
        <span>{foilPriceLabel}</span>
      </Flex>
    </Flex>
  );

  return (
    <StyledPriceWrapper>
      <Tooltip title={tooltip}>{displayFoil ? foilPriceLabel : priceLabel}</Tooltip>
    </StyledPriceWrapper>
  );
};

const renderOwned = (isEditing, onChangeAmount, onSaveChanges, amountKey) => (
  card,
  _,
  index
) => {
  const autoFocus = !index && amountKey === 'amountOwned';
  return (
    <EditableAmount
      isEditing={isEditing}
      onChangeAmount={onChangeAmount}
      onPressEnter={onSaveChanges}
      card={card}
      autoFocus={autoFocus}
      amountKey={amountKey}
    />
  );
};

const sortByPrice = (priceKey) => (a, b) => {
  const getPrice = (card) => card.prices[priceKey] || 0;
  return getPrice(a) - getPrice(b);
};

const sortByAmount = (ownedKey) => (a, b) => {
  return a[ownedKey] - b[ownedKey];
};

const sortByName = (a, b) => {
  return a.set_name > b.set_name ? 1 : -1;
};

const baseColumns = [
  {
    key: '1',
    title: 'Set',
    sorter: sortByName,
    render: renderSet,
    ellipsis: true,
  },
  {
    key: '2',
    title: 'USD',
    dataIndex: 'prices',
    sorter: sortByPrice('usd'),
    render: renderPrice('usd'),
    width: 80,
    align: 'right',
  },
  {
    key: '3',
    title: 'EUR',
    dataIndex: 'prices',
    sorter: sortByPrice('eur'),
    render: renderPrice('eur'),
    width: 80,
    align: 'right',
  },
];

const getOwnedAmount = (card, key) => {
  if (!card || !card.allSets) return '-';
  return card.allSets.reduce((acc, val) => acc + val[key] || 0, 0);
};

const ownedColumns = (card, isEditing, onChangeAmount, onSaveChanges) => [
  {
    key: '4',
    title: `Owned (${getOwnedAmount(card, 'amountOwned')})`,
    sorter: sortByAmount('amountOwned'),
    render: renderOwned(isEditing, onChangeAmount, onSaveChanges, 'amountOwned'),
    width: 140,
    align: 'center',
  },
  {
    key: '5',
    title: `Foil (${getOwnedAmount(card, 'amountOwnedFoil')})`,
    sorter: sortByAmount('amountOwnedFoil'),
    render: renderOwned(isEditing, onChangeAmount, onSaveChanges, 'amountOwnedFoil'),
    width: 110,
    align: 'center',
  },
];

export default (card, isEditing, onChangeAmount, onSaveChanges, hideOwnedColumns) => {
  const isMobile = getIsMobile();
  if (isMobile || hideOwnedColumns) return baseColumns;

  return baseColumns.concat(ownedColumns(card, isEditing, onChangeAmount, onSaveChanges));
};
