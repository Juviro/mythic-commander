import React from 'react';
import { Collapse, Typography } from 'antd';

import { useParams } from 'react-router';
import { CollectionStats, CollectionVisibility } from '../../Elements/Shared';

export default () => {
  const { username } = useParams();

  if (username) {
    return (
      <Typography.Title level={2} ellipsis style={{ width: '100%' }}>
        {`${username}'s collection`}
      </Typography.Title>
    );
  }

  return (
    <Collapse
      style={{ width: '100%', backgroundColor: 'white' }}
      expandIcon={() => <div />}
      expandIconPosition="right"
      defaultActiveKey="1"
    >
      <Collapse.Panel key="1" size="small" header="Your Collection">
        <CollectionStats small />
        <CollectionVisibility style={{ marginTop: 32 }} />
      </Collapse.Panel>
    </Collapse>
  );
};
