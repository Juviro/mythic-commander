import React from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { Input } from 'antd';

export default ({ paramName, placeholder, onSearch }) => {
  const [value, setSearch] = useQueryParam(paramName, StringParam);

  const onPressEnter = () => {
    if (onSearch) onSearch();
  };

  return (
    <Input.Search
      onPressEnter={onPressEnter}
      value={value}
      placeholder={placeholder}
      onChange={e => setSearch(e.target.value)}
      style={{ width: '100%' }}
      size="small"
    />
  );
};
