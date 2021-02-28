import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import CustomSkeleton from '../CustomSkeleton';

const StyledWrapper = styled.span`
  width: 100%;
`;

export default ({ name, onChange, level = 4, canEdit = false }) => {
  if (name === undefined) return <CustomSkeleton.Line />;

  return (
    <StyledWrapper>
      <Typography.Title
        ellipsis
        level={level}
        editable={canEdit && { onChange }}
        style={{ display: 'block', marginLeft: 8, marginBottom: 0 }}
      >
        {name}
      </Typography.Title>
    </StyledWrapper>
  );
};
