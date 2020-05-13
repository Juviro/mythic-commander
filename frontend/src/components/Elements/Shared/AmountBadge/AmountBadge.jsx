import React from 'react';
import styled from 'styled-components';

const StyledAmountBadge = styled.div`
  background-color: #3053ff80;
  position: absolute;
  left: -1px;
  top: -17px;
  width: 50px;
  height: 38px;
  padding: 5px;
  transform: skewY(-50deg);
`;

const StyledAmount = styled.div`
  transform: skewY(50deg);
  color: white;
  position: absolute;
  left: 10px;
  font-weight: 600;
  top: 11px;
`;

export default ({ amount }) => {
  if (amount === 1) return null;

  return (
    <StyledAmountBadge>
      <StyledAmount>{amount}</StyledAmount>
    </StyledAmountBadge>
  );
};
