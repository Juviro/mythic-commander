import React from 'react';
import { Card, Typography } from 'antd';

import Cover from './Cover';
import { Flex } from '../../Shared';
import formatDate from '../../../../utils/formatDate';

const Description = ({ list }) => (
  <Flex direction="column">
    <Typography.Text>{`${list.numberOfCards} cards`}</Typography.Text>
    <Flex direction="row" justify="space-between" style={{ fontStyle: 'italic' }}>
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
