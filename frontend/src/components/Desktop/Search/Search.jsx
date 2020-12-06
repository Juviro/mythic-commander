import React from 'react';

import SearchOptions from './SearchOptions';
import { useToggle } from '../../Hooks';
import {
  PageCategory,
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
            <PageCategory title="Advanced Search" isFirst>
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
            </PageCategory>
            {isSearching && (
              <PageCategory title={`Found ${numberOfCards} Cards`}>
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
              </PageCategory>
            )}
          </>
        )}
      </SearchHoc>
    </PageLayout>
  );
};
