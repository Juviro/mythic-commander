import React from 'react';
import styled from 'styled-components';

import Set from '../Set';
import { getIsMobile } from '../../Desktop/MobileRedirect';
import EditableAmount from '../CardListMobile/EditableAmount';

const StyledPriceWrapper = styled.div`
  @media (max-width: 764px) {
    font-size: 12px;
  }
`;

const renderSet = card => {
  return <Set setKey={card.set} name={card.set_name} />;
};

const renderPrice = priceKey => price => (
  <StyledPriceWrapper>
    {price[priceKey] ? `$${price[priceKey]}` : '-'}
  </StyledPriceWrapper>
);

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

const sortByPrice = priceKey => (a, b) => {
  const getPrice = card => card.prices[priceKey] || 0;
  return getPrice(a) - getPrice(b);
};

const sortByAmount = ownedKey => (a, b) => {
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
    title: 'Price',
    dataIndex: 'prices',
    sorter: sortByPrice('usd'),
    render: renderPrice('usd'),
    width: 80,
    align: 'center',
  },
  {
    key: '3',
    title: 'Foil',
    dataIndex: 'prices',
    sorter: sortByPrice('usd_foil'),
    render: renderPrice('usd_foil'),
    width: 80,
    align: 'center',
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
    render: renderOwned(
      isEditing,
      onChangeAmount,
      onSaveChanges,
      'amountOwned'
    ),
    width: 120,
    align: 'center',
  },
  {
    key: '5',
    title: `Foil (${getOwnedAmount(card, 'amountOwnedFoil')})`,
    sorter: sortByAmount('amountOwnedFoil'),
    render: renderOwned(
      isEditing,
      onChangeAmount,
      onSaveChanges,
      'amountOwnedFoil'
    ),
    width: 100,
    align: 'center',
  },
];

export default (card, isEditing, onChangeAmount, onSaveChanges) => {
  const isMobile = getIsMobile();
  if (isMobile) return baseColumns;

  return baseColumns.concat(
    ownedColumns(card, isEditing, onChangeAmount, onSaveChanges)
  );
};
