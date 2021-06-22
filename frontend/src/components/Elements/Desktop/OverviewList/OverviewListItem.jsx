import React from 'react';
import { Card, Typography, Space } from 'antd';

import Flex from 'components/Elements/Shared/Flex';
import ManaSymbol from 'components/Elements/Shared/ManaCost/ManaSymbol';
import Cover from './Cover';
import formatDate from '../../../../utils/formatDate';

const Description = ({ list }) => (
  <Flex direction="column">
    <Flex justify="space-between">
      <Typography.Text>{`${list.numberOfCards} cards`}</Typography.Text>
      {list.colors && (
        <Space size={4} style={{ marginRight: 2 }}>
          {list.colors.map((color) => (
            <ManaSymbol symbol={color} key={color} size={20} />
          ))}
        </Space>
      )}
    </Flex>
    <Flex
      direction="row"
      justify="space-between"
      style={{ fontStyle: 'italic', marginTop: 4 }}
    >
      <Typography.Text type="secondary">Last edit:</Typography.Text>
      <Typography.Text type="secondary">
        {formatDate(list.lastEdit, true)}
      </Typography.Text>
    </Flex>
  </Flex>
);

export default ({ list, onClick }) => {
  return (
    <Card hoverable cover={<Cover list={list} />} onClick={() => onClick(list.id)}>
      <Card.Meta title={list.name} description={<Description list={list} />} />
    </Card>
  );
};
