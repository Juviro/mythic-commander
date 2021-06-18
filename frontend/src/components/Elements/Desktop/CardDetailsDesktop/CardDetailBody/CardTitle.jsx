import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import CustomSkeleton from 'components/Elements/Shared/CustomSkeleton';

const StyledWrapper = styled.div`
  height: 55px;
`;

export default ({ card }) => {
  return !card ? (
    <StyledWrapper>
      <CustomSkeleton.Line />
    </StyledWrapper>
  ) : (
    <Typography.Title level={2}>{card.name}</Typography.Title>
  );
};
