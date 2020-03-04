import React from 'react';
import { useParams } from 'react-router';
import { useMutation } from 'react-apollo';
import { editDeckCard } from '../../../../../../../queries';
import { getDeck } from '../../../../../../../queries/deck';
import { SetPicker } from '../../../../../../Elements';

export default ({ card }) => {
  const { id: deckId } = useParams();
  const [editMutation] = useMutation(editDeckCard);

  const onChangeSet = id => {
    editMutation({
      variables: { cardOracleId: card.oracle_id, deckId, newProps: { id } },
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
            ({ oracle_id }) => oracle_id !== editedCard.oracle_id
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
