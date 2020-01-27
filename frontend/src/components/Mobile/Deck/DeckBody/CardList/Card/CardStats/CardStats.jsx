import React from 'react';
import styled from 'styled-components';
import SetPicker from './SetPicker';

const getChecked = isChecked => (isChecked ? '✓' : '✗');

const StyledInnerStatsWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  margin-left: -100vw;
  overflow: hidden;
  position: absolute;
  flex-direction: column;
  transition: all 0.3s;
  width: calc(50vw - 16px);

  ${({ isVisible }) => {
    if (!isVisible) return '';
    return `
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
        <Stat label="Average cost" value={card.priceLabel} />
        <Stat label="In your Collection" value={getChecked(card.owned)} />
        <Stat label="Allowed in this deck" value={getChecked(isLegal)} />
      </StyledInnerStatsWrapper>
    </div>
  );
};
