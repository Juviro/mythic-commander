import React from 'react';
import { Input, Button, Tooltip, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageCard } from 'components/Elements/Desktop/PageLayout';
import Flex from 'components/Elements/Shared/Flex';

export default ({
  onEnter,
  onAddList,
  search,
  setSearch,
  loading,
  buttonText,
  title,
  extra,
}) => {
  return (
    <PageCard
      loading={loading}
      extra={
        <Space>
          {extra}
          <Button onClick={onAddList} type="primary" icon={<PlusOutlined />}>
            {buttonText}
          </Button>
        </Space>
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
            placeholder="Search by Name..."
            style={{ maxWidth: 350 }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Tooltip>
      </Flex>
    </PageCard>
  );
};
