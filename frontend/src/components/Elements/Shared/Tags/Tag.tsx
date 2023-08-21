import React from 'react';
import { Tag as AntdTag } from 'antd';
import styled from 'styled-components';

import { tagColors } from 'constants/colors';

export const StyledTag = styled(AntdTag)<{ onClick?: () => void }>`
  margin: 2px 8px 2px 0;
  position: relative;
  border-radius: 12px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`;

interface Props {
  tag: string;
  onClick?: () => void;
  onDeleteTag?: (tag: string, event: React.MouseEvent) => void;
}

const Tag = ({ tag, onClick, onDeleteTag }: Props) => {
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

export default Tag;
