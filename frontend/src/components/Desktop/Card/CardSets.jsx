import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { message } from 'antd';
import { CardSetOverview, EditIcon } from '../../Elements';
import { getCollectionNames } from '../../../queries';
import { changeCollection } from './queries';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ({ card, loading, selectedCardId, onChangeSet }) => {
  const [mutate] = useMutation(changeCollection);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMap, setEditedMap] = useState({});
  const [addedMap, setAddedMap] = useState({});

  const onDiscard = () => {
    setEditedMap({});
    setAddedMap({});
    setIsEditing(false);
  };

  useEffect(() => {
    onDiscard();
  }, [card.id]);

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
      update: cache => {
        const existing = cache.readQuery({
          query: getCollectionNames,
        });

        const alreadyOwned = existing.collection.cards.some(
          ({ name }) => name === card.name
        );

        if (alreadyOwned) return;

        cache.writeQuery({
          query: getCollectionNames,
          data: {
            collection: {
              ...existing.collection,
              cards: existing.collection.cards.concat({
                __typename: 'CollectionCard',
                card: {
                  name: card.name,
                  __typename: 'Card',
                },
              }),
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
        maxHeight="auto"
      />
    </StyledWrapper>
  );
};
