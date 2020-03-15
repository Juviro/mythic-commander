import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { StringParam, useQueryParams } from 'use-query-params';

import ColorSelection from './ColorSelection';

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Filter = () => {
  const [filter, setFilter] = useQueryParams({
    search: StringParam,
    colors: StringParam,
  });

  const onChange = key => value => {
    setFilter({ [key]: value });
  };

  return (
    <FilterWrapper>
      <Input.Search
        value={filter.search}
        placeholder="Filter by name"
        onChange={e => onChange('search')(e.target.value)}
        style={{ width: '100%' }}
        size="small"
      />
      <ColorSelection
        onSetColors={onChange('colors')}
        selectedColors={filter.colors}
      />
    </FilterWrapper>
  );
};

export default withRouter(Filter);
