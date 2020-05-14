import React from 'react';
import { Card, Input, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Flex } from '../../Shared';

export default ({
  onEnter,
  onAddList,
  search,
  setSearch,
  loading,
  buttonText,
}) => {
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
          title={onEnter && 'Press ↵ to open the first result'}
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
        <Button onClick={onAddList} type="primary" icon={<PlusOutlined />}>
          {buttonText}
        </Button>
      </Flex>
    </Card>
  );
};
