import React from 'react';
import { Divider } from 'antd';

import { useParams } from 'react-router';
import AddToCollection from './AddToCollection';
import { CollectionStats, CollectionVisibility } from '../../Elements/Shared';
import { Sidebar } from '../../Elements/Desktop';

export default ({ isVisible, toggleIsVisible }) => {
  const { username } = useParams();

  if (username) return null;

  return (
    <Sidebar isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <Divider style={{ marginTop: 0 }}>Overview</Divider>
      <CollectionStats showCharts />
      <Divider>Add cards</Divider>
      <AddToCollection />
      <Divider>Share</Divider>
      <CollectionVisibility />
    </Sidebar>
  );
};
