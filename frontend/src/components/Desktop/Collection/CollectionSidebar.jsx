import React from 'react';
import { Divider } from 'antd';

import AddToCollection from './AddToCollection';
import { CollectionStats } from '../../Elements/Shared';
import { Sidebar } from '../../Elements/Desktop';

export default ({ snapshot, cards, isVisible, toggleIsVisible, loading }) => {
  return (
    <Sidebar isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <Divider style={{ marginTop: 0 }}>Overview</Divider>
      <CollectionStats
        snapshot={snapshot}
        cards={cards}
        loading={loading}
        showCharts
      />
      <Divider>Add cards</Divider>
      <AddToCollection />
    </Sidebar>
  );
};
