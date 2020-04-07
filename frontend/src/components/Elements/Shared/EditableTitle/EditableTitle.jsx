import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import CustomSkeleton from '../CustomSkeleton';

const StyledWrapper = styled.span`
  width: 100%;
`;

export default ({ name, onChange }) => {
  if (name === undefined) return <CustomSkeleton.Line />;

  return (
    <StyledWrapper>
      <Typography.Title
        ellipsis
        level={4}
        editable={{ onChange }}
        style={{ display: 'block', marginLeft: 8 }}
      >
        {name}
      </Typography.Title>
    </StyledWrapper>
  );
};
