import React from 'react';

import { Sidebar } from '../../Elements/Desktop';
import { SearchButton, Filter } from '../../Elements/Shared';

export default ({ isVisible, toggleIsVisible, onSearch, loading }) => {
  return (
    <Sidebar
      isVisible={isVisible}
      toggleIsVisible={toggleIsVisible}
      wrapperStyle={{ padding: '12px 24px' }}
    >
      <Filter advancedSearch onSearch={onSearch} />

      <SearchButton onSearch={onSearch} loading={loading} />
    </Sidebar>
  );
};
