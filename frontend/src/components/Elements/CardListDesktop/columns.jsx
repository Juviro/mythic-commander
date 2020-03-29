import React from 'react';

import { getPriceLabel } from '../../../utils/cardStats';
import PreviewCardImage from '../PreviewCardImage';
import ManaCost from '../ManaCost';

const renderAmount = ({ totalAmount, amount }) => totalAmount; // amount || totalAmount || 0;
const renderType = ({ primaryTypes, subTypes }) => {
  if (!subTypes.length) return primaryTypes.join(' ');
  return `${primaryTypes.join(' ')} - ${subTypes.join(' ')}`;
};
const renderPrice = ({ minPrice, sumPrice }) => {
  if (minPrice === sumPrice) return getPriceLabel(minPrice);

  return `${getPriceLabel(minPrice)}  (${getPriceLabel(sumPrice)})`;
};

export default [
  {
    title: 'Card',
    key: 'img',
    width: 50,
    render: card => <PreviewCardImage card={card} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
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
  },
  {
    title: 'Amount',
    key: 'amount',
    width: 20,
    align: 'center',
    render: renderAmount,
  },
  {
    title: 'Price',
    key: 'minPrice',
    width: 150,
    align: 'center',
    render: renderPrice,
  },
];
