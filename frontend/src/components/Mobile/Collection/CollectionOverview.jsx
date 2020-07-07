import React from 'react';
import { Collapse, Typography } from 'antd';

import { useParams } from 'react-router';
import { CollectionStats, CollectionVisibility } from '../../Elements/Shared';

export default () => {
  const { username } = useParams();

  if (username) {
    return (
      <Typography.Title level={2} ellipsis style={{ width: '100%' }}>
        {`${username}'s Collection`}
      </Typography.Title>
    );
  }

  return (
    <Collapse
      style={{ width: '100%', backgroundColor: 'white' }}
      expandIcon={() => <div />}
      expandIconPosition="right"
      defaultActiveKey={['overview']}
    >
      <Collapse.Panel key="overview" size="small" header="Overview">
        <CollectionStats small />
      </Collapse.Panel>
      <Collapse.Panel key="share" size="small" header="Share...">
        <CollectionVisibility />
      </Collapse.Panel>
    </Collapse>
  );
};
