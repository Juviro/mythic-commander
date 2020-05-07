import React from 'react';
import { Card, Input, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Flex } from '../../Elements/Shared';

export default ({ onEnter, onAddWantsList, search, setSearch, loading }) => {
  return (
    <Card
      loading={loading}
      style={{
        width: 1000,
        margin: 16,
        maxWidth: 'calc(100% - 32px)',
      }}
    >
      <Flex direction="row" justify="space-between">
        <Tooltip
          trigger={['click']}
          title="Press ↵ to open the first result"
          placement="bottomLeft"
        >
          <Input.Search
            autoFocus
            onSearch={onEnter}
            onPressEnter={onEnter}
            value={search}
            placeholder="Search by name..."
            style={{ maxWidth: 350 }}
            onChange={e => setSearch(e.target.value)}
          />
        </Tooltip>
        <Button onClick={onAddWantsList} type="primary" icon={<PlusOutlined />}>
          New Wants List
        </Button>
      </Flex>
    </Card>
  );
};
