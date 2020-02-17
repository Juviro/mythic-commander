import React, { useState } from 'react';
import styled from 'styled-components';
import { Skeleton } from 'antd';

import OwnedOverview from './OwnedOverview';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// TODO: move reused colors like this to const file
const StyledHeadline = styled.span`
  color: ${({ owned }) => (owned ? '#1fb31f' : 'black')};
`;

const StyledMoreButton = styled.span`
  font-size: 12px;
  font-style: italic;
  color: rgb(171, 171, 171);
`;

const getOwnedAmount = card =>
  card.all_sets.reduce(
    ({ ownedNonfoil: onf, ownedFoil: of }, { amount, amountFoil }) => ({
      ownedNonfoil: onf + amount,
      ownedFoil: of + amountFoil,
    }),
    { ownedNonfoil: 0, ownedFoil: 0 }
  );

export default ({ card, loading }) => {
  const [isOpen, setIsOpen] = useState(true);
  if (!card || loading) return <Skeleton active paragraph={null} />;

  const { ownedNonfoil, ownedFoil } = getOwnedAmount(card);
  const totalOwned = ownedNonfoil + ownedFoil;

  return (
    <>
      <StyledWrapper>
        <StyledHeadline owned={Boolean(totalOwned)}>
          {totalOwned ? `${totalOwned}x collected` : 'Not yet collected'}
          {ownedFoil ? ` (${ownedFoil}x foil)` : ''}
        </StyledHeadline>
        <StyledMoreButton onClick={() => setIsOpen(!isOpen)}>
          details
        </StyledMoreButton>
      </StyledWrapper>
      <OwnedOverview cards={card.all_sets} isOpen={isOpen} />
    </>
  );
};
