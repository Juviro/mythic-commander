import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { loyalities as loyalitiyIcons } from '../../../../assets/mtgIcons';

const StyledWrapper = styled.span`
  position: relative;
`;

const StyledIcon = styled.img`
  width: ${({ size }) => size * 2.5}px;
  height: ${({ size }) => size * 2.5}px;
`;

const StyledAmount = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: ${({ offsetTop }) => offsetTop}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledText = styled(Typography.Text)`
  font-size: ${({ size }) => size * 0.9}px;
  color: white;
`;

const getIcon = (symbol) => {
  if (symbol.startsWith('+')) return { icon: loyalitiyIcons.up, offset: 2 };
  if (symbol.startsWith('−')) return { icon: loyalitiyIcons.down, offset: -2 };
  return { icon: loyalitiyIcons.neutral, offset: 0 };
};

export default ({ symbol, size }) => {
  const { icon, offset } = getIcon(symbol);
  const amount = symbol.replace(':', '');

  return (
    <StyledWrapper>
      <StyledIcon src={icon} size={size} />
      <StyledAmount size={size} offsetTop={offset}>
        <StyledText strong size={size}>
          {amount}
        </StyledText>
      </StyledAmount>
    </StyledWrapper>
  );
};
