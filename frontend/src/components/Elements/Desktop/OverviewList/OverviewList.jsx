import React from 'react';
import { Card, Empty } from 'antd';
import styled from 'styled-components';
import { Flex } from '../../Shared';
import OverviewListItem from './OverviewListItem';

const StyledListWrapper = styled(Card)`
  margin: 16px;
  max-width: calc(100% - 32px);
  width: 1000px;
`;

export default ({ lists, onClick, loading }) => {
  return (
    <StyledListWrapper loading={loading}>
      <Flex wrap="wrap">
        {lists.map(list => (
          <OverviewListItem list={list} onClick={onClick} key={list.id} />
        ))}
        {!lists.length && (
          <Empty style={{ width: '100%' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Flex>
    </StyledListWrapper>
  );
};
