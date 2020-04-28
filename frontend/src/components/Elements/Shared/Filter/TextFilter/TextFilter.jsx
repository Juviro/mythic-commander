import React, { useRef } from 'react';
import { Input } from 'antd';

import { useBlurOnEsc } from '../../../../Hooks';

export default ({
  placeholder,
  onSearch,
  size = 'small',
  inputRef,
  autoFocus,
  onChange,
  value,
  style,
}) => {
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
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', ...style }}
      size={size}
    />
  );
};
