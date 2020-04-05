import React from 'react';

import { getPriceLabel } from '../../../../utils/cardStats';
import PreviewCardImage from '../../PreviewCardImage';
import ManaCost from '../../ManaCost';
import { CARD_TYPES } from '../../../CardProvider/staticTypes';
import formatDate from '../../../../utils/formatDate';

const renderAmount = ({ totalAmount, amount }) => amount || totalAmount || 0;
const renderType = ({ primaryTypes, subTypes }) => {
  if (!subTypes.length) return primaryTypes.join(' ');
  return `${primaryTypes.join(' ')} - ${subTypes.join(' ')}`;
};
const renderPrice = ({ minPrice, sumPrice, totalAmount }) => {
  if (minPrice === sumPrice || totalAmount === 1) {
    return getPriceLabel(sumPrice);
  }

  return `${getPriceLabel(minPrice)}  (${getPriceLabel(sumPrice)})`;
};

const sortByAmount = columnKey => (a, b) => {
  return Number(a[columnKey]) - Number(b[columnKey]);
};
const sortByName = columnKey => (a, b) => {
  return a[columnKey] > b[columnKey] ? 1 : -1;
};

const sortType = (a, b) => {
  const getIndex = ({ primaryTypes }) => {
    const mainType = primaryTypes[primaryTypes.length - 1];
    return CARD_TYPES.indexOf(mainType);
  };
  return getIndex(a) - getIndex(b);
};

export default [
  {
    title: 'Card',
    key: 'img',
    width: 70,
    render: card => <PreviewCardImage card={card} highlightOnHover />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: sortByName('name'),
  },
  {
    title: 'CMC',
    key: 'cmc',
    dataIndex: 'cmc',
    width: 50,
    align: 'center',
    sorter: sortByAmount('cmc'),
  },
  {
    title: 'Mana Cost',
    key: 'mana_cost',
    dataIndex: 'mana_cost',
    width: 200,
    align: 'center',
    render: manaCost => <ManaCost costString={manaCost} />,
  },
  {
    title: 'Type',
    key: 'type',
    width: 350,
    align: 'center',
    render: renderType,
    sorter: sortType,
  },
  {
    title: 'Amount',
    key: 'amount',
    width: 20,
    align: 'center',
    render: renderAmount,
    sorter: sortByAmount('totalAmount'),
  },
  {
    title: 'Price',
    key: 'minPrice',
    width: 150,
    align: 'center',
    render: renderPrice,
    sorter: sortByAmount('minPrice'),
  },
  {
    title: 'Added',
    key: 'added',
    width: 150,
    align: 'center',
    dataIndex: 'createdAt',
    render: formatDate,
    sorter: sortByAmount('createdAt'),
  },
];
