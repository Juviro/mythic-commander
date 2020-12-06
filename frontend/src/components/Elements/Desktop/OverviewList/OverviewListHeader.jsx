import React from 'react';
import { Input, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageCard } from 'components/Elements/Desktop/PageLayout';
import { Flex } from '../../Shared';

export default ({
  onEnter,
  onAddList,
  search,
  setSearch,
  loading,
  buttonText,
  title,
}) => {
  return (
    <PageCard
      isFirst
      loading={loading}
      extra={
        <Button onClick={onAddList} type="primary" icon={<PlusOutlined />}>
          {buttonText}
        </Button>
      }
      title={title}
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </Tooltip>
      </Flex>
    </PageCard>
  );
};
