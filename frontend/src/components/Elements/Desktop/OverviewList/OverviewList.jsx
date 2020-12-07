import React from 'react';
import { Card, Empty } from 'antd';
import styled from 'styled-components';
import shimmer from 'components/Animations/shimmer';
import OverviewListItem from './OverviewListItem';

const StyledOverviewList = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  padding: 24px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

const StyledPlaceholder = styled(Card)`
  width: 100%;
`;

const StyledCover = styled.div`
  width: 100%;
  padding-bottom: 73%;
  ${shimmer}
`;

const LoadingPlaceholder = () => {
  const dummyArray = [...new Array(12)].map((_, i) => i);

  return (
    <StyledOverviewList>
      {dummyArray.map((index) => (
        <StyledPlaceholder key={index} loading cover={<StyledCover />} />
      ))}
    </StyledOverviewList>
  );
};

export default ({ lists, onClick, loading, emptyText }) => {
  if (loading) return <LoadingPlaceholder />;
  if (!lists.length)
    return (
      <Empty
        style={{ width: '100%' }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={emptyText}
      />
    );

  return (
    <StyledOverviewList>
      {lists.map((list) => (
        <OverviewListItem list={list} onClick={onClick} key={list.id} />
      ))}
    </StyledOverviewList>
  );
};
