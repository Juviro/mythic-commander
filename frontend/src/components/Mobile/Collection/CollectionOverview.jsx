import React from 'react';
import { Card, Typography } from 'antd';

import { useParams } from 'react-router';
import { CollectionStats, CollectionVisibility } from '../../Elements/Shared';

export default () => {
  const { username } = useParams();

  if (username) {
    return (
      <Typography.Title
        level={2}
        ellipsis
        style={{ width: '100%', paddingLeft: 10, marginTop: 8 }}
      >
        {`${username}'s Collection`}
      </Typography.Title>
    );
  }

  return (
    <Card
      title="Your Collection"
      style={{ width: '100%' }}
      extra={<CollectionVisibility />}
    >
      <CollectionStats />
    </Card>
  );
};
