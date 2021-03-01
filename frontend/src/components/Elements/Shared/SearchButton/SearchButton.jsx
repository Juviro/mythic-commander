import React from 'react';

import { Button } from 'antd';
import styled, { css } from 'styled-components';
import Flex from '../Flex';
import ResetFilter from '../Filter/ResetFilter';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isAffixed }) =>
    isAffixed &&
    css`
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;

      @media (max-height: 500px) {
        display: none;
      }
    `}
`;

const StyledResetWrapper = styled.span`
  ${({ isAffixed }) =>
    isAffixed &&
    css`
      @media (max-height: 500px) {
        display: none;
      }
    `}
`;

export default ({
  onSearch,
  loading,
  style,
  wrapperStyle,
  buttonRef,
  isAffixed,
  isFilterResettable,
  onResetOptions,
}) => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="baseline"
      style={{ marginTop: 24, width: '100%', ...wrapperStyle }}
    >
      <StyledResetWrapper isAffixed={isAffixed}>
        {isFilterResettable && (
          <ResetFilter title="Reset Search" onReset={onResetOptions} />
        )}
      </StyledResetWrapper>
      <StyledWrapper ref={buttonRef} isAffixed={isAffixed}>
        <Button
          loading={loading}
          type="primary"
          style={{ minWidth: 150, width: '100%', ...style }}
          onClick={onSearch}
        >
          Search
        </Button>
      </StyledWrapper>
    </Flex>
  );
};
