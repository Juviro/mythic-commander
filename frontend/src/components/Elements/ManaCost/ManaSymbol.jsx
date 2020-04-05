import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { colors as colorIcons } from '../../../assets/icons';

const StyledColorTag = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 2px;
  box-shadow: 1px 1px 2px #5f5f5f;
`;

export default ({ symbol }) => {
  if (symbol === '//') {
    return (
      <Typography.Text strong style={{ fontSize: 20, margin: '0 6px' }}>
        {symbol}
      </Typography.Text>
    );
  }

  const src = colorIcons[symbol];
  if (!src) return `{${symbol}}`;

  return <StyledColorTag src={src} />;
};
