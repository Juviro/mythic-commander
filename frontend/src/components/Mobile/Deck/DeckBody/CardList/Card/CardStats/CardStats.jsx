import React from 'react';
import styled from 'styled-components';
import SetPicker from './SetPicker';

const getChecked = isChecked => (isChecked ? '✓' : '✗');

const StyledInnerStatsWrapper = styled.div`
  height: 0;
  display: flex;
  margin-top: 32px;
  margin-left: -50vw;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  transition: all 0.4s;
  width: calc(50vw - 16px);

  ${({ isVisible }) => {
    if (!isVisible) return '';
    return `
      height: auto;
      margin-left: 8px;
    `;
  }}
`;

const StyledStatWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledStatLabel = styled.span`
  color: rgba(0, 0, 0, 0.45);
`;

const StyledStat = styled.span`
  color: rgba(0, 0, 0, 0.9);
`;

const Stat = ({ label, value }) => {
  return (
    <StyledStatWrapper>
      <StyledStatLabel>{`${label}: `}</StyledStatLabel>
      <StyledStat>{value}</StyledStat>
    </StyledStatWrapper>
  );
};

export default ({ card, isVisible, isLegal }) => {
  return (
    <div>
      <StyledInnerStatsWrapper isVisible={isVisible}>
        <Stat label="Set" value={<SetPicker card={card} />} />
        <Stat label="Available from" value={card.priceLabel} />
        <Stat label="In your Collection" value={getChecked(card.owned)} />
        <Stat label="Allowed in this deck" value={getChecked(isLegal)} />

        {/* <span>Set + change</span>
        <span>is commander + change</span>
        <span>is in collection + change</span>
        <span>delete from deck</span> */}
      </StyledInnerStatsWrapper>
    </div>
  );
};
