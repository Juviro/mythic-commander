import React, { useEffect } from 'react';
import { List, BackTop, Typography } from 'antd';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useQueryParams, StringParam } from 'use-query-params';
import { withRouter } from 'react-router';

import CardListItem from './CardListItem';
import CustomSkeleton from '../CustomSkeleton';
import GridCard from './GridCard';
import Footer from './Footer';

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
  onChangeElement,
  onDeleteElement,
  showTotalResults,
}) => {
  const [{ name, layout = 'list' }] = useQueryParams({
    name: StringParam,
    layout: StringParam,
  });

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, [basePath]);

  if (!cards) {
    return <CustomSkeleton.List />;
  }

  const onOpenDetailView = ({ id, oracle_id }) => {
    history.push(`${basePath}/${oracle_id}/${id}${history.location.search}`);
  };

  const totalResultsLabel = showTotalResults && (
    <Typography.Text
      strong
      style={{ marginBottom: 16 }}
    >{`Found ${totalResults} cards:`}</Typography.Text>
  );

  const cardList =
    layout === 'list' ? (
      <>
        <List
          size="small"
          dataSource={cards}
          style={{ width: '100%', minHeight: '70vh' }}
          renderItem={card => (
            <CardListItem
              card={card}
              onChangeElement={onChangeElement}
              onDeleteElement={onDeleteElement}
              searchString={name}
              onClick={() => onOpenDetailView(card)}
            />
          )}
        />
      </>
    ) : (
      <>
        <StyledGridWrapper>
          {cards.map(card => (
            <GridCard
              key={card.id}
              onClick={() => onOpenDetailView(card)}
              card={card}
              isLarge={layout !== 'grid'}
            />
          ))}
        </StyledGridWrapper>
      </>
    );

  return (
    <>
      {totalResultsLabel}
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={!loading && hasMore}
        style={{ width: '100%' }}
        threshold={1000}
      >
        {cardList}
      </InfiniteScroll>
      <Footer
        loading={loading}
        displayedCards={cards.length}
        totalResults={totalResults}
      />
      <BackTop style={{ left: 20, bottom: 20 }} />
    </>
  );
};

export default withRouter(CardList);
