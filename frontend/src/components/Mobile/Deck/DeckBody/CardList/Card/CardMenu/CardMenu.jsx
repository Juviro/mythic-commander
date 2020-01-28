import React from 'react';
import styled from 'styled-components';
import CardStats from './CardStats';
import CardActions from './CardActions';

const StyledInnerStatsWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  margin-left: -100vw;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  transition: all 0.2s;
  width: calc(50vw - 16px);
  justify-content: space-between;
  height: calc((50vw * 1.35));

  ${({ isVisible }) => {
    if (!isVisible) return '';
    return `
      margin-left: 8px;
    `;
  }}
`;

export default ({ card, isVisible, isLegal }) => {
  return (
    <div>
      <StyledInnerStatsWrapper isVisible={isVisible}>
        <CardStats card={card} isLegal={isLegal} />
        <CardActions card={card} />
      </StyledInnerStatsWrapper>
    </div>
  );
};
