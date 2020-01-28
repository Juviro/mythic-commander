import React from 'react';
import styled from 'styled-components';
import SetPicker from './SetPicker';

const getChecked = isChecked => (isChecked ? '✓' : '✗');

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
      {label && <StyledStatLabel>{`${label}: `}</StyledStatLabel>}
      <StyledStat>{value}</StyledStat>
    </StyledStatWrapper>
  );
};

export default ({ card, isLegal }) => {
  // TODO: move isAllowed to warning icon in header
  return (
    <>
      <div>
        <Stat label="Average cost" value={card.priceLabel} />
        <Stat label="In your collection" value={getChecked(card.owned)} />
        <Stat label="Allowed in this deck" value={getChecked(isLegal)} />
      </div>
      <div>
        <Stat value={<SetPicker card={card} />} />
      </div>
    </>
  );
};
