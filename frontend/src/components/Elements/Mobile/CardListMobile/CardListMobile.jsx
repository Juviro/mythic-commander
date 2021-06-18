import React, { useState } from 'react';
import { List, BackTop, Typography } from 'antd';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useQueryParams, StringParam } from 'use-query-params';
import { withRouter } from 'react-router';

import CardGrid from 'components/Elements/Shared/CardGrid';
import LazyLoad from 'components/Elements/Shared/LazyLoad';
import CardListItem from './CardListItem';
import CustomSkeleton from '../../Shared/CustomSkeleton';
import Footer from './Footer';
import CardModal from '../../../Mobile/Card/CardModal';

const StyledPlaceholderWrapper = styled.div`
  padding: 4px 8px;
  width: 100%;
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
  deleteByOracle,
  disableSelection,
}) => {
  const [detailCard, setDetailCard] = useState(null);
  const [{ name, layout = 'list' }] = useQueryParams({
    name: StringParam,
    layout: StringParam,
  });

  // we don't want to display the skeletons when loading more with infinite scroll
  // only when a new search is triggered
  if (!cards || (isNewSearch && loading)) {
    const getPlaceholder = () => {
      if (layout === 'list') return <CustomSkeleton.List />;
      if (layout === 'grid') return <CustomSkeleton.GridMobile />;
      if (layout === 'card') return <CustomSkeleton.GridMobile large />;
      return null;
    };

    return <StyledPlaceholderWrapper>{getPlaceholder()}</StyledPlaceholderWrapper>;
  }

  const onOpenDetails = (card) => {
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
          <LazyLoad offset={200} height={56}>
            <CardListItem
              card={card}
              moveToList={moveToList}
              onEditCard={onEditCard}
              onDeleteCard={onDeleteCard}
              searchString={name}
              onClick={() => onOpenDetails(card)}
            />
          </LazyLoad>
        )}
      />
    ) : (
      <CardGrid
        cards={cards}
        loading={loading}
        onOpenDetails={onOpenDetails}
        hidePagination
        disableSelection={disableSelection}
        cardsPerRow={layout === 'grid' ? 2 : 1}
        canZoomIn
        onEditCard={onEditCard}
        onDeleteCard={onDeleteCard}
        deleteByOracle={deleteByOracle}
      />
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
