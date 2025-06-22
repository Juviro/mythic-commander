import React from 'react';
import { TagOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import AddTagsPopover from 'components/Elements/Shared/Tags/AddTagsPopover';
import { MutationAddTagsToCardsArgs } from 'types/graphql';
import { useParams } from 'react-router';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import { addTagsToCards } from './queries';
import { GridCard as GridCardType } from '../cardgrid.types';

interface Props {
  allTags: string[];
  cardIds: string[];
  allCards: GridCardType[];
  onClearSelection: () => void;
}

const AddTagsButton = ({ allTags, cardIds, allCards, onClearSelection }: Props) => {
  const { id: deckId } = useParams<{ id: string }>();
  const [mutate] = useMutation<any, MutationAddTagsToCardsArgs>(addTagsToCards);

  const onSave = (tags: string[]) => {
    const newCards = (allCards as UnifiedDeckCard[])
      .filter(({ id }) => cardIds.includes(id))
      .map(({ id, tags: oldTags }) => ({
        id: `${id}+${deckId}`,
        tags: [...new Set([...(oldTags ?? []), ...tags])],
        __typename: 'DeckCard',
      }));

    mutate({
      variables: {
        tags,
        deckId,
        cardIds,
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        addTagsToCards: newCards,
      }),
    });
    onClearSelection();
  };

  return (
    <AddTagsPopover allTags={allTags} onSave={onSave}>
      <TagOutlined />
    </AddTagsPopover>
  );
};

export default AddTagsButton;
