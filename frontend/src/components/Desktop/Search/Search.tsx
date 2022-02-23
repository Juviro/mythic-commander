import React, { useRef } from 'react';

import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import PageLayout, { PageCard } from 'components/Elements/Desktop/PageLayout';
import PaginatedCardList from 'components/Elements/Desktop/PaginatedCardList';
import SearchOptions from './SearchOptions';
import SearchHoc from '../../Elements/Shared/SearchHoc';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useDocumentTitle('Advanced Search');

  return (
    <PageLayout>
      <SearchHoc researchOnOrderChange>
        {({
          isSearching,
          loading,
          onSearch,
          onResetOptions,
          onChangeOption,
          currentOptions,
          lastSearchOptions,
          currentCards,
          numberOfCards,
        }) => (
          <>
            <PageCard title="Advanced Search">
              <SearchOptions
                loading={loading}
                onSearch={() => {
                  onSearch();
                  setTimeout(
                    () => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }),
                    200
                  );
                }}
                onResetOptions={onResetOptions}
                onChangeOption={onChangeOption}
                options={currentOptions}
              />
            </PageCard>
            <div ref={scrollRef} />
            {isSearching && (
              <PageCard
                title={numberOfCards !== undefined && `Found ${numberOfCards} Cards`}
              >
                <PaginatedCardList
                  loading={loading}
                  setSearch={null}
                  search={lastSearchOptions.name}
                  cards={currentCards}
                  numberOfCards={numberOfCards}
                  showCollectionFilters={false}
                  showAddedBeforeFilter={false}
                />
              </PageCard>
            )}
          </>
        )}
      </SearchHoc>
    </PageLayout>
  );
};
