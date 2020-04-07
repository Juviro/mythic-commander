import React from 'react';
import { Skeleton, Collapse } from 'antd';

import OwnedOverview from './OwnedOverview';

const getOwnedAmount = card => {
  return card.allSets.reduce(
    (
      { ownedNonfoil: onf, ownedFoil: of },
      { amountOwned, amountOwnedFoil }
    ) => ({
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
    <Collapse
      style={{ width: '100%', backgroundColor: 'white' }}
      bordered={false}
      className="no-padding-collapse"
    >
      <Collapse.Panel
        key="1"
        header={totalOwned ? `${totalOwned}x collected` : 'Not yet collected'}
      >
        <OwnedOverview
          cardOracleId={card.oracle_id}
          cardName={card.name}
          cards={card.allSets}
          onChangeSet={onChangeSet}
          selectedCardId={selectedCardId}
        />
      </Collapse.Panel>
    </Collapse>
  );
};
