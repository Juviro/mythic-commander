import React, { useRef } from 'react';
import { Input, Typography } from 'antd';
import { useQueryParam, StringParam } from 'use-query-params';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  width: 150px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export default ({ paramName, onSearch }) => {
  const [value = '', setSearch] = useQueryParam(paramName, StringParam);
  const inputRefFrom = useRef(null);
  const inputRefTo = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [_, from = '', __, to = ''] = value.match(/(\d*)(-)(\d*)/) || [];

  const onChange = isFirst => event => {
    const val = event.target.value && Math.min(event.target.value, 99);
    if (isFirst) setSearch(`${val}-${to}`);
    if (!isFirst) setSearch(`${from}-${val}`);
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
        size="small"
        style={{ width: 60 }}
        type="number"
        value={from}
        placeholder="from"
        ref={inputRefFrom}
        onPressEnter={onPressEnter}
        onChange={onChange(true)}
      />
      <Typography.Text>-</Typography.Text>
      <Input
        size="small"
        style={{ width: 60 }}
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
