import React, { useRef } from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { Input } from 'antd';

export default ({ paramName, placeholder, onSearch }) => {
  const [value, setSearch] = useQueryParam(paramName, StringParam);

  const inputRef = useRef(null);

  const onPressEnter = () => {
    if (onSearch) onSearch();
    setTimeout(() => inputRef.current.blur(), 100);
  };

  return (
    <Input.Search
      onPressEnter={onPressEnter}
      value={value}
      ref={inputRef}
      placeholder={placeholder}
      onChange={e => setSearch(e.target.value)}
      style={{ width: '100%' }}
      size="small"
    />
  );
};
