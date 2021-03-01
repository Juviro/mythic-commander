import React, { useRef } from 'react';

import SearchOptions from './SearchOptions';
import {
  PageCard,
  PageLayout,
  PaginatedCardList,
  WithActions,
} from '../../Elements/Desktop';
import { SearchHoc } from '../../Elements/Shared';

export default () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
                    100
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
                <WithActions>
                  {(actionProps) => (
                    <PaginatedCardList
                      {...actionProps}
                      loading={loading}
                      search={lastSearchOptions.name}
                      hiddenColumns={['added', 'amount']}
                      cards={currentCards}
                      numberOfCards={numberOfCards}
                    />
                  )}
                </WithActions>
              </PageCard>
            )}
          </>
        )}
      </SearchHoc>
    </PageLayout>
  );
};
