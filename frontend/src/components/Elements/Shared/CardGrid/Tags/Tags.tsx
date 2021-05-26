import React from 'react';
import styled from 'styled-components';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { AddTag } from './AddTag';
import { Tag } from './Tag';

const StyledWrapper = styled.div`
  width: 100%;
  margin-top: 4px;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const Tags = ({ onSetTags, card, allTags }: Props) => {
  const onDeleteTag = (tag: string) => {
    const newTags = card.tags.filter((name) => name !== tag);
    onSetTags(card.id, newTags);
  };

  return (
    <StyledWrapper>
      {card.tags?.map((tag) => (
        <Tag tag={tag} key={tag} onDeleteTag={onDeleteTag} />
      ))}
      <AddTag onSetTags={onSetTags} card={card} allTags={allTags} />
    </StyledWrapper>
  );
};
