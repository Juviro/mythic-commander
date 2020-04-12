import React from 'react';

import { Sidebar } from '../../Elements/Desktop';
import NameFilter from '../../Elements/Shared/Filter/TextFilter/NameFilter';
import { SearchButton } from '../../Elements/Shared';

export default ({ isVisible, toggleIsVisible, onSearch, loading }) => {
  return (
    <Sidebar isVisible={isVisible} toggleIsVisible={toggleIsVisible}>
      <NameFilter
        onSearch={onSearch}
        size="large"
        placeholder="Search for name"
      />

      <SearchButton onSearch={onSearch} loading={loading} />
    </Sidebar>
  );
};
