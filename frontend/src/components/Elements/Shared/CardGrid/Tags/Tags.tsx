import React, { useState } from 'react';
import styled from 'styled-components';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import DEFAULT_TAGS from 'constants/tags';
import { useMutation } from '@apollo/client';
import { MutationSetDefaultTagsArgs } from 'types/graphql';
import { AddTagButton } from './AddTagButton';
import Tag from '../../Tags/Tag';
import AddTagsMenu from '../../Tags/AddTagsMenu';
import { setDefaultTags } from './queries';

const StyledWrapper = styled.div`
  width: 100%;
  flex: 1;
  margin-top: 4px;
`;

interface Props {
  onSetTags: (cardId: string, tags: string[]) => void;
  card: UnifiedDeckCard;
  allTags: string[];
}

export const Tags = ({ onSetTags, card, allTags }: Props) => {
  const [mutate] = useMutation<null, MutationSetDefaultTagsArgs>(setDefaultTags);
  const [isEditing, setIsEditing] = useState(false);
  const onDeleteTag = (tag: string) => {
    const newTags = card.tags.filter((name) => name !== tag);
    onSetTags(card.id, newTags);
  };

  const onSave = (newTags: string[]) => {
    onSetTags(card.id, newTags);
  };

  const onSaveAsDefault = (newTags: string[]) => {
    onSetTags(card.id, newTags);
    const newDefaultTags = newTags.filter((tag) => DEFAULT_TAGS.includes(tag));
    mutate({ variables: { tags: newDefaultTags, oracleId: card.oracle_id } });
  };

  return (
    <StyledWrapper>
      {!isEditing ? (
        <>
          {card.tags?.map((tag) => (
            <Tag tag={tag} key={tag} onDeleteTag={onSetTags ? onDeleteTag : undefined} />
          ))}
          {onSetTags && <AddTagButton onClick={() => setIsEditing(true)} />}
        </>
      ) : (
        <AddTagsMenu
          onSave={onSave}
          onClose={() => setIsEditing(false)}
          initialTags={card?.tags}
          allTags={allTags}
          onSaveAsDefault={onSaveAsDefault}
        />
      )}
    </StyledWrapper>
  );
};
