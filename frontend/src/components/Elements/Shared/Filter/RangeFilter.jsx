import React, { useRef } from 'react';
import { Input, Typography } from 'antd';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  width: 170px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export default ({ onSearch, onChange: onSubmit, value = '', size = 'small' }) => {
  const inputRefFrom = useRef(null);
  const inputRefTo = useRef(null);

  const [, from = '', , to = ''] = value.match(/(\d*)(-)(\d*)/) || [];

  const onChange = (isFirst) => (event) => {
    const val = event.target.value && Math.min(event.target.value, 99);
    const newValue = isFirst ? `${val}-${to}` : `${from}-${val}`;

    onSubmit(newValue);
  };

  const onPressEnter = () => {
    if (onSearch) onSearch();
    setTimeout(() => {
      inputRefFrom.current.blur();
      inputRefTo.current.blur();
    }, 100);
  };

  return (
    <StyledWrapper>
      <Input
        size={size}
        style={{ width: 75 }}
        type="number"
        value={from}
        placeholder="from"
        ref={inputRefFrom}
        onPressEnter={onPressEnter}
        onChange={onChange(true)}
      />
      <Typography.Text>-</Typography.Text>
      <Input
        size={size}
        style={{ width: 75 }}
        type="number"
        value={to}
        placeholder="to"
        ref={inputRefTo}
        onPressEnter={onPressEnter}
        onChange={onChange(false)}
      />
    </StyledWrapper>
  );
};
