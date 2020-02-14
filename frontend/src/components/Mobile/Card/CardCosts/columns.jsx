import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';

import Set from '../../../Elements/Set/Set';

const StyledPriceWrapper = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: flex-end;
`;

const renderSet = card => {
  return (
    <Set
      setKey={card.set}
      name={card.set_name}
      style={{
        maxWidth: 'calc(100vw - 180px)',
        fontSize: 12,
      }}
    />
  );
};

const renderUsd = ({ usd, usd_foil }) => {
  return (
    <StyledPriceWrapper>
      {!usd && usd_foil && (
        <Icon
          style={{ marginRight: '1px', marginLeft: '-20px' }}
          type="star"
          theme="twoTone"
          twoToneColor="#d4af37"
        />
      )}
      {usd || usd_foil ? `${usd || usd_foil}$` : '-'}
    </StyledPriceWrapper>
  );
};

const renderEur = price => (
  <StyledPriceWrapper>{price ? `${price}€` : '-'}</StyledPriceWrapper>
);

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
    render: renderEur,
  },
  {
    key: '3',
    title: 'USD',
    dataIndex: 'prices',
    render: renderUsd,
  },
];
