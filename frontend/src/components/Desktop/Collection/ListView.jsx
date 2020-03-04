import React from 'react';
import styled from 'styled-components';

import Actions from './Actions';
import { Table } from '../../Elements';

const ListViewWrapper = styled.div`
  display: flex;
`;

export default ({ cards, loading = false }) => {
  return (
    <ListViewWrapper>
      <Table
        type="collection"
        cards={cards}
        loading={loading}
        Actions={Actions}
        displayedColumns={['prices', 'images']}
      />
    </ListViewWrapper>
  );
};
