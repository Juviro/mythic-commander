import React from 'react';
import { List, BackTop, Typography } from 'antd';
import styled from 'styled-components';

import { useQueryParams, StringParam } from 'use-query-params';
import { withRouter } from 'react-router';
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

const CardList = ({
  cards,
  loading,
  onLoadMore,
  hasMore,
  totalResults,
  history,
  basePath,
  isEditing,
  onChangeAmount,
  onDeleteElement,
  showTotalResults,
}) => {
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

  const onOpenDetailView = ({ id, oracle_id }) => {
    history.push(`${basePath}/${oracle_id}/${id}${history.location.search}`);
  };

  const totalResultsLabel = showTotalResults && (
    <Typography.Text
      strong
      style={{ marginBottom: 16 }}
    >{`Found ${totalResults} cards:`}</Typography.Text>
  );

  if (layout === 'list') {
    return (
      <>
        {totalResultsLabel}
        <List
          loadMore={showMoreButton}
          size="small"
          dataSource={cards}
          style={{ width: '100%', minHeight: '70vh' }}
          renderItem={card => (
            <CardListItem
              card={card}
              isEditing={isEditing}
              onChangeAmount={onChangeAmount}
              onDeleteElement={onDeleteElement}
              searchString={name}
              onClick={() => onOpenDetailView(card)}
            />
          )}
        />
        <BackTop style={{ left: 20, bottom: 20 }} />
      </>
    );
  }

  return (
    <>
      {totalResultsLabel}
      <StyledGridWrapper>
        {cards.map(card => (
          <GridCard
            key={card.id}
            onClick={() => onOpenDetailView(card)}
            card={card}
            isLarge={layout !== 'grid'}
          />
        ))}
        {showMoreButton}
        <BackTop style={{ left: 20, bottom: 20 }} />
      </StyledGridWrapper>
    </>
  );
};

export default withRouter(CardList);
