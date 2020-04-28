import React from 'react';

import { Button } from 'antd';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({ onSearch, loading, style, buttonRef }) => {
  return (
    <StyledWrapper ref={buttonRef}>
      <Button
        loading={loading}
        type="primary"
        style={{ minWidth: 150, ...style }}
        onClick={onSearch}
      >
        Search
      </Button>
    </StyledWrapper>
  );
};
