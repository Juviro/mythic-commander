import React from 'react';
import { Card, Empty } from 'antd';
import styled from 'styled-components';
import Cover from './Cover';
import { Flex } from '../../Shared';

const StyledListWrapper = styled(Card)`
  margin: 16px;
  max-width: calc(100% - 32px);
  width: 1000px;
`;

const StyledCardWrapper = styled.div`
  margin: 16px;
  width: calc(25% - 32px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ({ lists, onClick, loading }) => {
  return (
    <StyledListWrapper loading={loading}>
      <Flex wrap="wrap">
        {lists.map(list => (
          <StyledCardWrapper key={list.id}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={<Cover list={list} />}
              onClick={() => onClick(list.id)}
            >
              <Card.Meta
                title={list.name}
                description={`${list.numberOfCards} cards`}
              />
            </Card>
          </StyledCardWrapper>
        ))}
        {!lists.length && (
          <Empty
            style={{ width: '100%' }}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </Flex>
    </StyledListWrapper>
  );
};
