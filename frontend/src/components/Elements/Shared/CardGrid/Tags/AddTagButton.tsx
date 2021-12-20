import React from 'react';
import styled from 'styled-components';
import { EditOutlined } from '@ant-design/icons';
import { Tag as AntdTag } from 'antd';

import { greyBorder } from 'constants/colors';

const StyledAddTag = styled(AntdTag)`
  cursor: pointer;
  background-color: white;
  border: 1px solid ${greyBorder};
  margin-top: 4px;
  border-radius: 12px;
`;

interface Props {
  onClick: () => void;
}

export const AddTagButton = ({ onClick }: Props) => {
  return (
    <StyledAddTag onClick={onClick}>
      <EditOutlined />
      <span>Edit Tags</span>
    </StyledAddTag>
  );
};
