import React, { useState } from 'react';
import styled from 'styled-components';

import Sidebar from './Sidebar/Sidebar';
import Table from '../Elements/CardView/Table/Table';
import { deleteFromCollection } from '../../queries';

const ListViewWrapper = styled.div`
  display: flex;
`;

export default ({ cards, loading = false }) => {
  const [highlightedCard, setHighlightedCard] = useState(null);

  return (
    <ListViewWrapper>
      <Sidebar
        highlightedCard={cards.find(({ name }) => name === highlightedCard)}
        onHideCard={() => setHighlightedCard(null)}
      />
      <Table
        cards={cards}
        loading={loading}
        setHighlightedCard={setHighlightedCard}
        deleteMutation={deleteFromCollection}
        displayedColumns={['actions', 'prices', 'images']}
      />
    </ListViewWrapper>
  );
};
