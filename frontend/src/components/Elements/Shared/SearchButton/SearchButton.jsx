import React from 'react';

import { Button } from 'antd';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export default ({ onSearch, loading }) => {
  return (
    <StyledWrapper>
      <Button
        loading={loading}
        type="primary"
        style={{ minWidth: 150 }}
        onClick={onSearch}
      >
        Search
      </Button>
    </StyledWrapper>
  );
};
