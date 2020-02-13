import React from 'react';

import { Icon } from 'antd';
import Set from '../../../Elements/Set/Set';

const renderSet = card => {
  return (
    <Set
      setKey={card.set}
      name={card.set_name}
      style={{
        maxWidth: '50vw',
      }}
    />
  );
};

const renderUsd = ({ usd, usd_foil }) => {
  return (
    <>
      {!usd && usd_foil && (
        <Icon
          style={{ marginLeft: '-20px', marginRight: '1px' }}
          type="star"
          theme="twoTone"
          twoToneColor="#d4af37"
        />
      )}
      {usd || usd_foil ? `${usd || usd_foil}$` : '-'}
    </>
  );
};

export default [
  {
    key: '1',
    title: 'Set',
    render: renderSet,
  },
  {
    key: '2',
    title: 'EUR',
    dataIndex: 'prices.eur',
    render: price => (price ? `${price}€` : '-'),
  },
  {
    key: '3',
    title: 'USD',
    dataIndex: 'prices',
    render: renderUsd,
  },
];
