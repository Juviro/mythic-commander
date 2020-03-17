import React from 'react';
import styled from 'styled-components';
import { FilterOutlined } from '@ant-design/icons';

import ResetFilter from './ResetFilter';

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

export default ({ showIcon = true }) => {
  return (
    <StyledHeader>
      <div>
        <StyledText />
      </div>
      <div>
        <ResetFilter />
        {showIcon && <FilterOutlined />}
      </div>
    </StyledHeader>
  );
};
