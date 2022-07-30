import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { colors as colorIcons } from '../../../../assets/mtgIcons';
import Loyality from './Loyality';

const StyledColorTag = styled.img`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  margin-right: 2px;
  box-shadow: 1px 1px 2px #5f5f5f;

  && {
    border-radius: 50%;
  }
`;
export default ({ symbol, size = 18, margin = 0 }) => {
  if (symbol === '//') {
    return (
      <Typography.Text strong style={{ fontSize: size, margin: '0 6px' }}>
        {symbol}
      </Typography.Text>
    );
  }
  const plainSymbol = symbol.replace(/[{}]/g, '');

  if (plainSymbol.includes(':')) {
    return <Loyality symbol={plainSymbol} size={size} />;
  }

  const src = colorIcons[plainSymbol];
  if (!src) return `{${plainSymbol}}`;

  return (
    <StyledColorTag src={src} size={size} alt={`{${plainSymbol}}`} style={{ margin }} />
  );
};
