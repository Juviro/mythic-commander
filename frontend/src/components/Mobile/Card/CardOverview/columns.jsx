import React from 'react';
import styled from 'styled-components';

import { Set } from '../../../Elements';

const StyledPriceWrapper = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: flex-end;
`;

const renderSet = card => {
  return <Set setKey={card.set} name={card.set_name} />;
};

const renderPrice = priceKey => price => (
  <StyledPriceWrapper>
    {price[priceKey] ? `$${price[priceKey]}` : '-'}
  </StyledPriceWrapper>
);

const sortByPrice = priceKey => (a, b) => {
  const getPrice = card => card.prices[priceKey] || 0;
  return getPrice(a) - getPrice(b);
};

const sortByName = (a, b) => {
  return a.set_name > b.set_name ? 1 : -1;
};

export default [
  {
    key: '1',
    title: 'Set',
    sorter: sortByName,
    render: renderSet,
  },
  {
    key: '2',
    title: 'Basic',
    dataIndex: 'prices',
    sorter: sortByPrice('usd'),
    render: renderPrice('usd'),
  },
  {
    key: '3',
    title: 'Foil',
    dataIndex: 'prices',
    sorter: sortByPrice('usd_foil'),
    render: renderPrice('usd_foil'),
  },
];
