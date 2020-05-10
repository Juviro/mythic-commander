import React from 'react';
import styled from 'styled-components';
import { DeleteOutlined } from '@ant-design/icons';

import { ContextMenu } from '../../../Shared';

const StyledContextMenu = styled.div`
  position: absolute;
  right: 8%;
  top: 12%;
  border-radius: 50%;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
`;

export default ({ onDeleteCard, loading }) => {
  const actions = [];
  if (onDeleteCard) {
    actions.push({
      title: 'Delete',
      Icon: DeleteOutlined,
      onClick: onDeleteCard,
    });
  }

  if (!actions.length || loading) return null;

  return (
    <StyledContextMenu>
      <ContextMenu menuItems={actions} />
    </StyledContextMenu>
  );
};
