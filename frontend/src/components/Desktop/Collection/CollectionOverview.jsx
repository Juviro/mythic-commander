import React from 'react';

import { PageCard } from 'components/Elements/Desktop/PageLayout';
import CollectionStats from 'components/Elements/Shared/CollectionStats';
import { CollectionVisibility } from 'components/Elements/Shared/Visibility';

export default () => {
  return (
    <PageCard
      title="Overview"
      extra={<CollectionVisibility />}
      bodyStyle={{ padding: '0 24px' }}
    >
      <CollectionStats showCharts horizontal />
    </PageCard>
  );
};
