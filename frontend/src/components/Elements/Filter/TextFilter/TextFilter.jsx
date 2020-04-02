import React, { useRef } from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { Input } from 'antd';

export default ({
  paramName,
  placeholder,
  onSearch,
  size = 'small',
  inputRef,
}) => {
  const [value, setSearch] = useQueryParam(paramName, StringParam);

  const ref = inputRef !== undefined ? inputRef : useRef(null);

  const onPressEnter = () => {
    if (onSearch) onSearch();
    setTimeout(() => ref.current.blur(), 100);
  };

  return (
    <Input.Search
      onPressEnter={onPressEnter}
      value={value}
      ref={ref}
      placeholder={placeholder}
      onChange={e => setSearch(e.target.value)}
      style={{ width: '100%' }}
      size={size}
    />
  );
};
