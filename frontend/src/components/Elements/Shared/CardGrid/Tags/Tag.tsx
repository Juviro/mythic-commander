import React from 'react';
import { Tag as AntdTag } from 'antd';
import styled from 'styled-components';

import { tagColors } from 'constants/colors';

export const StyledTag = styled(AntdTag)<{ onClick?: () => void }>`
  margin-top: 4px;
  position: relative;
  border-radius: 12px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

interface Props {
  tag: string;
  onClick?: () => void;
  onDeleteTag?: (tag: string, event: React.MouseEvent) => void;
}

export const Tag = ({ tag, onClick, onDeleteTag }: Props) => {
  const tagColor =
    tagColors.find(({ name }) => name === tag) ?? tagColors[tagColors.length - 1];

  return (
    <StyledTag
      key={tag}
      closable={Boolean(onDeleteTag)}
      color={tagColor?.color}
      onClick={onClick}
      onClose={onDeleteTag ? (event) => onDeleteTag(tag, event) : undefined}
    >
      {tag}
    </StyledTag>
  );
};
