import React, { useState } from 'react';
import styled from 'styled-components';

import Actions from './Actions';
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
        type="collection"
        cards={cards}
        loading={loading}
        Actions={Actions}
        setHighlightedCard={setHighlightedCard}
        deleteMutation={deleteFromCollection}
        displayedColumns={['prices', 'images']}
      />
    </ListViewWrapper>
  );
};
