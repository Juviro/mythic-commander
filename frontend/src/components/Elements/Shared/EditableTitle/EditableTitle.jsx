import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import CustomSkeleton from '../CustomSkeleton';

const StyledWrapper = styled.span`
  width: 100%;
`;

const EditableTitle = ({ name, onChange, level = 4, canEdit = false }) => {
  if (name === undefined) return <CustomSkeleton.Line />;

  return (
    <StyledWrapper>
      <Typography.Title
        ellipsis
        level={level}
        editable={canEdit && { onChange }}
        style={{ display: 'block', margin: '0 8px', height: 38 }}
      >
        {name}
      </Typography.Title>
    </StyledWrapper>
  );
};

export default EditableTitle;
