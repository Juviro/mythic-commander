import React from 'react';
import { Divider } from 'antd';

import AddToCollection from './AddToCollection';
import { CollectionStats } from '../../Elements/Shared';
import { Sidebar } from '../../Elements/Desktop';

export default ({ isVisible, toggleIsVisible }) => {
  return (
    <Sidebar isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <Divider style={{ marginTop: 0 }}>Overview</Divider>
      <CollectionStats showCharts />
      <Divider>Add cards</Divider>
      <AddToCollection />
    </Sidebar>
  );
};
