import { Tag } from 'antd';
import { tagColors } from 'constants/colors';
import React from 'react';
import styled from 'styled-components';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { AddTag } from './AddTag';

const StyledWrapper = styled.div`
  width: 100%;
  margin-top: 4px;
`;

export const StyledTag = styled(Tag)`
  margin-top: 4px;
  position: relative;
  border-radius: 12px;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const Tags = ({ onSetTags, card, allTags }: Props) => {
  const getColor = (tag: string) => {
    const tagColor =
      tagColors.find(({ name }) => name === tag) ?? tagColors[tagColors.length - 1];
    return tagColor.color;
  };

  const onDeleteTag = (tag: string) => {
    const newTags = card.tags.filter((name) => name !== tag);
    onSetTags(card.id, newTags);
  };

  return (
    <StyledWrapper>
      {card.tags?.map((tag) => (
        <StyledTag
          color={getColor(tag)}
          key={tag}
          closable
          onClose={() => onDeleteTag(tag)}
        >
          {tag}
        </StyledTag>
      ))}
      <AddTag onSetTags={onSetTags} card={card} allTags={allTags} />
    </StyledWrapper>
  );
};
