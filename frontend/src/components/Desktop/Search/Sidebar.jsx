import React from 'react';

import { Sidebar } from '../../Elements/Desktop';
import { SearchButton, Filter, Flex, ResetFilter } from '../../Elements/Shared';

export default ({
  onChangeOption,
  isVisible,
  toggleIsVisible,
  onSearch,
  loading,
  options,
  onResetOptions,
}) => {
  const isFilterResettable = Object.values(options).some(Boolean);

  return (
    <Sidebar
      isVisible={isVisible}
      toggleIsVisible={toggleIsVisible}
      wrapperStyle={{ padding: '12px 24px' }}
    >
      <Filter
        advancedSearch
        onSearch={onSearch}
        autoFocus
        options={options}
        onChangeOption={onChangeOption}
      />

      <Flex
        direction="row"
        justify="space-between"
        align="center"
        style={{ marginTop: 24 }}
      >
        <span>
          {isFilterResettable && (
            <ResetFilter title="reset" onReset={onResetOptions} />
          )}
        </span>
        <SearchButton onSearch={onSearch} loading={loading} />
      </Flex>
    </Sidebar>
  );
};
