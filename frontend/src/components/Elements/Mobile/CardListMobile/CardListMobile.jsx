import React, { useState } from 'react';
import { List, BackTop, Typography } from 'antd';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useQueryParams, StringParam } from 'use-query-params';
import { withRouter } from 'react-router';

import CardListItem from './CardListItem';
import CustomSkeleton from '../../Shared/CustomSkeleton';
import GridCard from './GridCard';
import Footer from './Footer';
import CardModal from '../../../Mobile/Card/CardModal';
import { LazyLoad } from '../../Shared';

const StyledGridWrapper = styled.div`
  display: ${({ isLarge }) => (isLarge ? 'block' : 'flex')};
  flex-wrap: wrap;
  align-items: flex-start;
`;

const CardList = ({
  cards,
  loading,
  onLoadMore,
  hasMore,
  totalResults,
  history,
  hideFooter,
  moveToList,
  onEditCard,
  onDeleteCard,
  showTotalResults,
  backTopStyle,
  isNewSearch,
}) => {
  const [detailCard, setDetailCard] = useState(null);
  const [{ name, layout = 'list' }] = useQueryParams({
    name: StringParam,
    layout: StringParam,
  });

  // we don't want to display the skeletons when loading more with infinite scroll
  // only when a new search is triggered
  if (!cards || (isNewSearch && loading)) {
    if (layout === 'list') return <CustomSkeleton.List />;
    if (layout === 'grid') return <CustomSkeleton.MobileGrid />;
    if (layout === 'card') return <CustomSkeleton.MobileGrid large />;
  }

  const onOpenDetailView = (card) => {
    setDetailCard(card);
    history.push(`${history.location.pathname}${history.location.search}#details`);
  };
  const onCloseModal = () => setDetailCard(null);

  const totalResultsLabel = showTotalResults && (
    <Typography.Text
      strong
      style={{ marginBottom: 16 }}
    >{`Found ${totalResults} cards:`}</Typography.Text>
  );

  const cardList =
    layout === 'list' ? (
      <List
        size="small"
        dataSource={cards}
        style={{ width: '100%' }}
        renderItem={(card) => (
          <LazyLoad offset={0} height={56}>
            <CardListItem
              card={card}
              moveToList={moveToList}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
              searchString={name}
              onClick={() => onOpenDetailView(card)}
            />
          </LazyLoad>
        )}
      />
    ) : (
      <StyledGridWrapper isLarge={layout !== 'grid'}>
        {cards.map((card) => (
          <GridCard
            key={card.id}
            onClick={() => onOpenDetailView(card)}
            card={card}
            moveToList={moveToList}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
            isLarge={layout !== 'grid'}
          />
        ))}
      </StyledGridWrapper>
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
        threshold={1500}
      >
        {Boolean(cards.length) && cardList}
      </InfiniteScroll>
      {!hideFooter && (
        <Footer
          loading={loading}
          displayedCards={cards.length}
          totalResults={totalResults}
        />
      )}
      <BackTop style={{ left: 20, bottom: 20, ...backTopStyle }} />
      <CardModal {...detailCard} onClose={onCloseModal} />
    </>
  );
};

export default withRouter(CardList);
