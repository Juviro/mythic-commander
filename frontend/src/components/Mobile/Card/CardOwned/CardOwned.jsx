import React from 'react';
import { Skeleton, Collapse } from 'antd';

import OwnedOverview from './OwnedOverview';

const getOwnedAmount = card => {
  return card.all_sets.reduce(
    ({ ownedNonfoil: onf, ownedFoil: of }, { amount, amountFoil }) => ({
      ownedNonfoil: onf + amount,
      ownedFoil: of + amountFoil,
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
      style={{ width: '100%', marginTop: 8 }}
      bordered={false}
      className="collapse-owned"
      expandIconPosition="right"
    >
      <Collapse.Panel
        key="1"
        header={totalOwned ? `${totalOwned}x collected` : 'Not yet collected'}
      >
        <OwnedOverview
          cards={card.all_sets}
          onChangeSet={onChangeSet}
          selectedCardId={selectedCardId}
        />
      </Collapse.Panel>
    </Collapse>
  );
};
