import React from 'react';
import styled from 'styled-components';
import { Statistic } from 'antd';

const StyledStatsWrapper = styled.div`
  height: 0;
  display: flex;

  ${({ isVisible }) => {
    if (!isVisible) return '';
    return `
      height: auto;
      `;
  }}
`;

const StyledInnerStatsWrapper = styled.div`
  height: 0;
  display: flex;
  margin-top: 28px;
  margin-left: -50vw;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  transition: all 0.2s;
  transition-delay: 0.1s;

  ${({ isVisible }) => {
    if (!isVisible) return '';
    return `
      height: auto;
      margin-left: 16px;
    `;
  }}
`;

export default ({ card, isVisible }) => {
  return (
    <StyledStatsWrapper isVisible={isVisible}>
      <StyledInnerStatsWrapper isVisible={isVisible}>
        <Statistic title="Available from" value={card.priceLabel} />

        {/* <span>Set + change</span>
        <span>is commander + change</span>
        <span>is in collection + change</span>
        <span>delete from deck</span> */}
      </StyledInnerStatsWrapper>
    </StyledStatsWrapper>
  );
};
