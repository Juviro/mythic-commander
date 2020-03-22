import React from 'react';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import { SetPicker } from '../../../../../../Elements';
import { getDeck, editDeckCard } from '../../../../queries';

export default ({ card }) => {
  const { id: deckId } = useParams();
  const [editMutation] = useMutation(editDeckCard);

  const onChangeSet = id => {
    editMutation({
      variables: { cardId: card.id, deckId, newProps: { id } },
      update: (cache, { data }) => {
        if (!data) return;
        const { editDeckCard: editedCard } = data;
        const existing = cache.readQuery({
          query: getDeck,
          variables: { id: deckId },
        });
        if (!existing) return;
        const cards = [
          ...existing.deck.cards.filter(
            existingCard => existingCard.id !== card.id
          ),
          editedCard,
        ];

        cache.writeQuery({
          query: getDeck,
          variables: { id: deckId },
          data: { deck: { ...existing.deck, cards } },
        });
      },
    });
  };

  return <SetPicker card={card} onClick={onChangeSet} />;
};
