import React from 'react';
import { List, BackTop } from 'antd';
import styled from 'styled-components';

import { useQueryParams, StringParam } from 'use-query-params';
import CardListItem from './CardListItem';
import CustomSkeleton from '../CustomSkeleton';
import GridCard from './GridCard';
import ShowMoreButton from './ShowMoreButton';

export const CARDS_PER_PAGE = 30;

const StyledGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 70vh;
  align-items: flex-start;
`;

export default ({ cards, loading, onLoadMore, hasMore, totalResults }) => {
  const [{ name, layout = 'list' }] = useQueryParams({
    name: StringParam,
    layout: StringParam,
  });

  if (!cards) {
    return <CustomSkeleton.List />;
  }

  const showMoreButton = (
    <ShowMoreButton
      loading={loading}
      hasMore={hasMore}
      totalResults={totalResults}
      onLoadMore={onLoadMore}
      displayedCards={cards.length}
    />
  );

  if (layout === 'list') {
    return (
      <>
        <List
          loadMore={showMoreButton}
          size="small"
          dataSource={cards}
          style={{ width: '100%', margin: 8, minHeight: '70vh' }}
          renderItem={card => <CardListItem card={card} searchString={name} />}
        />
        <BackTop style={{ left: 20, bottom: 20 }} />
      </>
    );
  }

  return (
    <StyledGridWrapper>
      {cards.map(card => (
        <GridCard
          loading={loading}
          key={card.id}
          card={card}
          isLarge={layout !== 'grid'}
        />
      ))}
      {showMoreButton}
      <BackTop style={{ left: 20, bottom: 20 }} />
    </StyledGridWrapper>
  );
};
