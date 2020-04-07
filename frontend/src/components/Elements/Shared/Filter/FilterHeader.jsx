import React from 'react';
import styled from 'styled-components';
import { FilterOutlined } from '@ant-design/icons';

import ResetFilter from './ResetFilter';

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export default ({ showIcon = true, headerText = 'Filter', hideReset }) => {
  return (
    <StyledHeader>
      <div>{headerText}</div>
      <div>
        {!hideReset && <ResetFilter />}
        {showIcon && <FilterOutlined />}
      </div>
    </StyledHeader>
  );
};
