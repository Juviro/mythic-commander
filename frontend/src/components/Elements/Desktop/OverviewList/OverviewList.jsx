import React, { useState } from 'react';
import { Button, Card, Empty } from 'antd';
import styled from 'styled-components';
import shimmer from 'components/Animations/shimmer';
import OverviewListItem from './OverviewListItem';

const StyledOverviewList = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  padding: ${(props) => (props.noPadding ? '0' : '24px')};

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

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 100%;
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

const OverviewList = ({
  lists,
  onClick,
  loading,
  emptyText,
  noPadding = false,
  initialLimit = 100,
}) => {
  const [limit, setLimit] = useState(initialLimit);

  if (loading) return <LoadingPlaceholder />;

  if (!lists?.length) {
    return (
      <Empty
        style={{ width: '100%' }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={emptyText}
      />
    );
  }

  const displayedList = lists?.slice(0, limit);
  const hasMore = lists?.length > limit;

  return (
    <>
      <StyledOverviewList noPadding={noPadding}>
        {displayedList.map((list) => (
          <OverviewListItem list={list} onClick={onClick} key={list.id} />
        ))}
      </StyledOverviewList>
      {hasMore && (
        <StyledButtonWrapper>
          <Button onClick={() => setLimit(limit + 100)} type="primary">
            Show more
          </Button>
        </StyledButtonWrapper>
      )}
    </>
  );
};

export default OverviewList;
