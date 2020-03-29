import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { message } from 'antd';
import { changeCollection } from './queries';
import { CardSetOverview, EditIcon } from '../../Elements';
import { getCollectionDesktop } from '../Collection/queries';
import { useShortcut } from '../../Hooks';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ({ card, loading, selectedCardId, onChangeSet }) => {
  const [mutate] = useMutation(changeCollection);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMap, setEditedMap] = useState({});
  const [addedMap, setAddedMap] = useState({});
  useShortcut('e', () => setIsEditing(true));

  const onDiscard = () => {
    setEditedMap({});
    setAddedMap({});
    setIsEditing(false);
  };

  useEffect(() => {
    onDiscard();
  }, [card.oracle_id]);

  const onSaveChanges = async () => {
    const edited = Object.keys(editedMap).map(id => ({
      ...editedMap[id],
      id,
    }));
    const added = Object.keys(addedMap).map(id => ({
      ...addedMap[id],
      id,
    }));
    mutate({
      variables: {
        cardOracleId: card.oracle_id,
        edited,
        added,
        cardId: card.id,
      },
      update: (
        cache,
        {
          data: {
            changeCollection: {
              card: { totalAmount },
            },
          },
        }
      ) => {
        const existing = cache.readQuery({
          query: getCollectionDesktop,
        });

        const newCards = existing.collection.cards
          .map(existingCard => {
            if (existingCard.card.oracle_id !== card.oracle_id) {
              return existingCard;
            }
            if (!totalAmount) return null;

            return {
              ...existingCard,
              card: {
                ...existingCard.card,
                totalAmount,
              },
            };
          })
          .filter(Boolean);
        cache.writeQuery({
          query: getCollectionDesktop,
          data: {
            collection: {
              ...existing.collection,
              cards: newCards,
            },
          },
        });
      },
    });
    message.success('Updated your collection!');
    onDiscard();
  };

  const onToggleEdit = () => {
    if (isEditing) {
      onSaveChanges();
    }
    setIsEditing(!isEditing);
  };

  const onChangeAmount = (newAmount, cardId, amountKey) => {
    const cardAlreadyOwned = card.allSets.some(
      ({ id, amountOwned, amountOwnedFoil }) =>
        id === cardId && (amountOwned || amountOwnedFoil)
    );
    const [currentValue, setMethod] = cardAlreadyOwned
      ? [editedMap, setEditedMap]
      : [addedMap, setAddedMap];
    setMethod({
      ...currentValue,
      [cardId]: {
        ...currentValue[cardId],
        [amountKey]: Math.max(Number(newAmount), 0),
      },
    });
  };

  return (
    <StyledWrapper>
      <EditIcon
        onClick={onToggleEdit}
        isEditing={isEditing}
        onDiscard={onDiscard}
      />
      <CardSetOverview
        card={card}
        loading={loading}
        isEditing={isEditing}
        onChangeAmount={onChangeAmount}
        selectedCardId={selectedCardId}
        onChangeSet={onChangeSet}
        onSaveChanges={onSaveChanges}
        maxHeight="auto"
      />
    </StyledWrapper>
  );
};
