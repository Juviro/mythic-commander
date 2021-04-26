import React from 'react';
import { Skeleton, Typography } from 'antd';

import styled from 'styled-components';
import OwnedOverview from './OwnedOverview';

const StyledLabel = styled(Typography.Text)`
  display: flex;
  align-self: flex-start;
`;

const getOwnedAmount = (card) => {
  return card.allSets.reduce(
    ({ ownedNonfoil: onf, ownedFoil: of }, { amountOwned, amountOwnedFoil }) => ({
      ownedNonfoil: onf + amountOwned,
      ownedFoil: of + amountOwnedFoil,
    }),
    { ownedNonfoil: 0, ownedFoil: 0 }
  );
};

export default ({ card, loading, onChangeSet, selectedCardId }) => {
  if (!card || loading) return <Skeleton active paragraph={null} />;

  const { ownedNonfoil, ownedFoil } = getOwnedAmount(card);
  const totalOwned = ownedNonfoil + ownedFoil;

  return (
    <>
      <StyledLabel strong>{`${totalOwned}x collected`}</StyledLabel>
      <OwnedOverview
        cardOracleId={card.oracle_id}
        cards={card.allSets}
        onChangeSet={onChangeSet}
        selectedCardId={selectedCardId}
      />
    </>
  );
};
