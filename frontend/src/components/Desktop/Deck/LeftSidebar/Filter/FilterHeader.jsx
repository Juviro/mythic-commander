import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';
import { FilterOutlined } from '@ant-design/icons';

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const StyledText = styled.span`
  &:before {
    content: 'Filter';
  }
`;

const filterAttrs = ['search', 'colors'];

export default () => {
  const [filter, setFilter] = useQueryParams(
    filterAttrs.reduce((acc, val) => ({ ...acc, [val]: StringParam }), {})
  );

  const onResetSearch = e => {
    e.stopPropagation();
    setFilter(filterAttrs.reduce((acc, val) => ({ ...acc, [val]: null }), {}));
  };

  const canResetSearch = filterAttrs.some(attr => filter[attr]);

  return (
    <StyledHeader>
      <div>
        <StyledText />
      </div>
      <div>
        {canResetSearch && (
          <Button
            onClick={onResetSearch}
            type="link"
            style={{ height: 15, lineHeight: 1, color: '#d20000' }}
          >
            reset Search
          </Button>
        )}
        <FilterOutlined />
      </div>
    </StyledHeader>
  );
};
