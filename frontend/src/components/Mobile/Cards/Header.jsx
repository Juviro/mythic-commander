import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import ResetFilter from '../../Elements/Filter/ResetFilter';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export default () => {
  return (
    <StyledWrapper>
      <Typography.Title level={4}>Search for cards</Typography.Title>
      <ResetFilter />
    </StyledWrapper>
  );
};
