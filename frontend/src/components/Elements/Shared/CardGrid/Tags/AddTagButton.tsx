import React from 'react';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Popover, Tag as AntdTag } from 'antd';

import { greyBorder } from 'constants/colors';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { AddTag } from './AddTag';

const StyledAddTag = styled(AntdTag)`
  cursor: pointer;
  background-color: white;
  border: 1px solid ${greyBorder};
  margin-top: 4px;
  border-radius: 12px;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const AddTagButton = ({ onSetTags, card, allTags }: Props) => {
  const menu = <AddTag onSetTags={onSetTags} card={card} allTags={allTags} />;

  return (
    <Popover content={menu} placement="bottomLeft" trigger={['click']}>
      <StyledAddTag>
        <PlusOutlined />
        <span>Add Tag</span>
      </StyledAddTag>
    </Popover>
  );
};
