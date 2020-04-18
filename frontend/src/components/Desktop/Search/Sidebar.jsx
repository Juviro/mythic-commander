import React from 'react';

import { Sidebar } from '../../Elements/Desktop';
import { SearchButton, Filter, Flex, ResetFilter } from '../../Elements/Shared';

export default ({ isVisible, toggleIsVisible, onSearch, loading }) => {
  return (
    <Sidebar
      isVisible={isVisible}
      toggleIsVisible={toggleIsVisible}
      wrapperStyle={{ padding: '12px 24px' }}
    >
      <Filter advancedSearch onSearch={onSearch} autoFocus />

      <Flex
        direction="row"
        justify="space-between"
        align="center"
        style={{ marginTop: 24 }}
      >
        <span>
          <ResetFilter title="reset" />
        </span>
        <SearchButton onSearch={onSearch} loading={loading} />
      </Flex>
    </Sidebar>
  );
};
