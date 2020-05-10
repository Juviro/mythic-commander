import React from 'react';
import styled from 'styled-components';
import { Card, Typography } from 'antd';

import Cover from './Cover';
import { Flex } from '../../Shared';
import formatDate from '../../../../utils/formatDate';

const StyledCardWrapper = styled.div`
  margin: 16px;
  width: calc(25% - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ list, onClick }) => {
  const description = (
    <Flex direction="column">
      <Typography.Text>{`${list.numberOfCards} cards`}</Typography.Text>
      <i>
        <Flex direction="row" justify="space-between">
          <Typography.Text type="secondary">Last edit:</Typography.Text>
          <Typography.Text type="secondary">
            {formatDate(list.lastEdit, true)}
          </Typography.Text>
        </Flex>
      </i>
    </Flex>
  );
  return (
    <StyledCardWrapper>
      <Card
        hoverable
        style={{ width: '100%' }}
        cover={<Cover list={list} />}
        onClick={() => onClick(list.id)}
      >
        <Card.Meta title={list.name} description={description} />
      </Card>
    </StyledCardWrapper>
  );
};
