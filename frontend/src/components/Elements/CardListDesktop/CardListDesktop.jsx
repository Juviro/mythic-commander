import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import TableHeader from './Header';
import Flex from '../Flex';
import CardTable from './CardTable';
import CardGrid from './CardGrid';

export default ({ cards, loading, widthOffset }) => {
  const [layout] = useQueryParam('layout', StringParam);

  return (
    <Flex direction="column" style={{ width: '100%', height: '100%' }}>
      <TableHeader />
      {layout === 'list' ? (
        <CardTable cards={cards} loading={loading} />
      ) : (
        <CardGrid cards={cards} loading={loading} widthOffset={widthOffset} />
      )}
    </Flex>
  );
};
