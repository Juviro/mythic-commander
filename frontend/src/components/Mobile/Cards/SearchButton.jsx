import React from 'react';

import { Button } from 'antd';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px
  align-items: center;
  justify-content: center;
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
