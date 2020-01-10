import React, { useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { StringParam, useQueryParams } from 'use-query-params';

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Filter = () => {
  const [filter, setFilter] = useQueryParams({
    search: StringParam,
  });

  const [state, setState] = useState({
    ...filter,
  });

  const onChange = key => e => {
    const { value } = e.target;
    setState({ ...state, [key]: value });
    setFilter({ [key]: value });
  };

  return (
    <FilterWrapper>
      <Input.Search
        value={state.search}
        autoFocus
        placeholder="Filter by name"
        onChange={onChange('search')}
        style={{ width: 250 }}
      />
    </FilterWrapper>
  );
};

export default withRouter(Filter);
