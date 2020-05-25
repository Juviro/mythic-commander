import React from 'react';

import { Button } from 'antd';
import styled from 'styled-components';
import Flex from '../Flex';
import ResetFilter from '../Filter/ResetFilter';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ({
  onSearch,
  loading,
  style,
  buttonRef,
  isFilterResettable,
  onResetOptions,
}) => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="baseline"
      style={{ marginTop: 24, width: '100%', ...style }}
    >
      <span>
        {isFilterResettable && (
          <ResetFilter title="reset" onReset={onResetOptions} />
        )}
      </span>

      <StyledWrapper ref={buttonRef}>
        <Button
          loading={loading}
          type="primary"
          style={{ minWidth: 150 }}
          onClick={onSearch}
        >
          Search
        </Button>
      </StyledWrapper>
    </Flex>
  );
};
