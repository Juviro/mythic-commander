import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import CardSet from './CardSet';

const getChecked = isChecked => (isChecked ? '✓' : '✗');

const blendIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const StyledStatWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.45);
  animation: ${blendIn} 0.5s linear;
`;

const StyledStat = styled.span`
  color: rgba(0, 0, 0, 0.9);
`;

const Stat = ({ label, value }) => {
  return (
    <StyledStatWrapper>
      {label && <span>{`${label}: `}</span>}
      <StyledStat>{value}</StyledStat>
    </StyledStatWrapper>
  );
};

export default ({ card, isLegal }) => {
  const { id, oracle_id } = card;
  const detailsUrl = `/m/cards/${oracle_id}/${id}`;
  return (
    <div>
      <Stat value={<CardSet card={card} />} />
      <Stat label="Average cost" value={card.priceLabel} />
      <Stat label="In your collection" value={getChecked(card.owned)} />
      <Stat label="Allowed in this deck" value={getChecked(isLegal)} />
      <Link to={detailsUrl}>Details</Link>
    </div>
  );
};
