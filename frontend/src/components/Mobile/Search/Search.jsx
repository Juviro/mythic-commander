import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Affix, Divider } from 'antd';
import { withRouter } from 'react-router';
import { useApolloClient } from 'react-apollo';
import { useQueryParams, StringParam } from 'use-query-params';

import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import LayoutAndSortPicker from 'components/Elements/Shared/LayoutAndSortPicker';
import SearchButton from 'components/Elements/Shared/SearchButton';
import Filter from 'components/Elements/Shared/Filter';
import { CardListMobile as CardList } from '../../Elements/Mobile';
import Header from './Header';
import { cardSearch } from './queries';
import { CARDS_PER_PAGE } from '../../Elements/Mobile/CardListMobile/FilteredCardList';
import { useToggle, useStoredQueryParam } from '../../Hooks';
import { unifySingleCard } from '../../../utils/unifyCardFormat';
import searchParams from '../../../constants/searchParams';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Search = ({ history }) => {
  const buttonRef = useRef(null);
  const scrollRef = useRef(null);
  const [isButtonAffixed, setIsButtonAffixed] = useState(false);
  const [isNewSearch, setIsNewSearch] = useState(false);
  const [allCards, setAllCards] = useState(null);
  const [queryResult, setQueryResult] = useState({});
  const [loading, toggleLoading] = useToggle(false);
  const [isSearching, toggleIsSearching] = useToggle(false);
  const [orderBy] = useStoredQueryParam('orderBy', StringParam);
  const [options, setParams] = useQueryParams(searchParams);
  const [currentOptions, setCurrentOptions] = useState(options);
  useDocumentTitle('Advanced Search');

  const client = useApolloClient();

  const { hasMore, nextOffset = 0, totalResults = 0 } = queryResult;

  const fetchCards = async (searchOptions, offset = 0) => {
    if (!orderBy) return;
    setIsNewSearch(!offset);
    toggleIsSearching(true);
    if (!offset) toggleLoading(true);
    const { data } = await client.query({
      fetchPolicy: 'cache-first',
      query: cardSearch,
      variables: {
        offset,
        limit: CARDS_PER_PAGE,
        options: { ...searchOptions, orderBy },
      },
    });
    setQueryResult(data.cardSearch);
    const { cards } = data.cardSearch;
    const newCards = offset ? (allCards || []).concat(cards) : cards;
    setAllCards(newCards.map(unifySingleCard));
    toggleLoading(false);
  };

  const scrollToButton = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
  };

  const onSearch = () => {
    setParams(currentOptions);
    fetchCards(currentOptions);
    setTimeout(scrollToButton, 200);
  };

  const onLoadMore = () => {
    fetchCards(options, nextOffset);
  };

  // search when initial values are set or params change
  useEffect(() => {
    const hasOptions = Object.values(options).some((val) => val !== undefined);
    if (!hasOptions) return;
    setTimeout(scrollToButton, 200);
    setCurrentOptions(options);
    fetchCards(options);
    // eslint-disable-next-line
  }, [history.location.search]);

  const onChangeOption = (key) => (value) => {
    setCurrentOptions({ ...currentOptions, [key]: value });
  };

  const onResetOptions = () => {
    const defaultOptions = Object.keys(options).reduce(
      (acc, val) => ({ ...acc, [val]: undefined }),
      {}
    );
    setCurrentOptions(defaultOptions);
  };

  const isFilterResettable = Object.values(currentOptions).some(Boolean);

  return (
    <StyledWrapper>
      <Header />
      <Divider />
      <Filter
        headerText="Advanced"
        onSearch={onSearch}
        onChangeOption={onChangeOption}
        options={currentOptions}
      />
      <LayoutAndSortPicker />
      <div ref={scrollRef} />
      <Affix offsetBottom={0} onChange={setIsButtonAffixed} style={{ width: '100%' }}>
        <SearchButton
          buttonRef={buttonRef}
          onSearch={onSearch}
          loading={loading}
          isAffixed={isButtonAffixed}
          onResetOptions={onResetOptions}
          isFilterResettable={isFilterResettable}
          wrapperStyle={{ height: 32 }}
          style={{
            height: isButtonAffixed ? 40 : 32,
            // prevent height change to be animated
            // while keeping transitions for hover etc
            transition: 'all 0.3s, height 0ms',
          }}
        />
      </Affix>
      {isSearching && (
        <>
          <Divider />
          <CardList
            showTotalResults
            cards={allCards}
            hasMore={hasMore}
            loading={loading}
            totalResults={totalResults}
            onLoadMore={onLoadMore}
            isNewSearch={isNewSearch}
            backTopStyle={isButtonAffixed ? { bottom: 45 } : null}
          />
        </>
      )}
    </StyledWrapper>
  );
};

export default withRouter(Search);
