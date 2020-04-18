import React, { useRef } from 'react';
import { Input } from 'antd';
import { useQueryParam, StringParam } from 'use-query-params';

import { useBlurOnEsc } from '../../../../Hooks';

export default ({
  paramName,
  placeholder,
  onSearch,
  size = 'small',
  inputRef,
  autoFocus,
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
      onKeyDown={useBlurOnEsc}
      placeholder={placeholder}
      autoFocus={autoFocus}
      onChange={e => setSearch(e.target.value)}
      style={{ width: '100%' }}
      size={size}
    />
  );
};
