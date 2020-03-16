import React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { Input } from 'antd';

export default () => {
  const [search, setSearch] = useQueryParam('search', StringParam);

  return (
    <Input.Search
      value={search}
      placeholder="Filter by name"
      onChange={e => setSearch(e.target.value)}
      style={{ width: '100%' }}
      size="small"
    />
  );
};
