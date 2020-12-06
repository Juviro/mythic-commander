import React from 'react';

import SearchOptions from './SearchOptions';
import { useToggle } from '../../Hooks';
import {
  PageCard,
  PageLayout,
  PaginatedCardList,
  WithActions,
} from '../../Elements/Desktop';
import { SearchHoc } from '../../Elements/Shared';

export default () => {
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(true);

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
                onSearch={onSearch}
                onResetOptions={onResetOptions}
                onChangeOption={onChangeOption}
                options={currentOptions}
                isVisible={isSidebarVisible}
                isFullscreen={!isSearching}
                toggleIsVisible={toggleIsSidebarVisible}
              />
            </PageCard>
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
