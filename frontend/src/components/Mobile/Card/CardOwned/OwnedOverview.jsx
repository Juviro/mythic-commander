import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { useMutation } from 'react-apollo';

import { EditIcon } from '../../../Elements';
import { changeCollection } from '../../../../queries/collection';
import AddCard from './AddCard';
import CardRow from './CardRow';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 12px;
  flex-direction: column;
`;

export default ({ cards, onChangeSet, selectedCardId }) => {
  const [mutate] = useMutation(changeCollection);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMap, setEditedMap] = useState({});
  const [addedMap, setAddedMap] = useState({});

  const ownedCards = cards.filter(
    ({ amount, amountFoil }) => amount + amountFoil
  );

  const onResetEditing = () => {
    setIsEditing(false);
    setEditedMap({});
    setAddedMap({});
  };

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
        edited,
        added,
      },
      refetchQueries: ['cardsByOracleId'],
    });
    onResetEditing();
  };

  const onChangeAmount = cardAlreadyOwned => (amount, cardId, isFoil) => {
    const key = isFoil ? 'amountFoil' : 'amount';
    const [currentValue, setMethod] = cardAlreadyOwned
      ? [editedMap, setEditedMap]
      : [addedMap, setAddedMap];
    setMethod({
      ...currentValue,
      [cardId]: {
        ...currentValue[cardId],
        [key]: Math.max(Number(amount), 0),
      },
    });
  };

  const onAddCard = id => {
    setAddedMap({
      ...addedMap,
      [id]: { amount: 0, amountFoil: 0 },
    });
  };

  const hasChanges = Boolean(
    Object.keys(editedMap).length + Object.keys(addedMap).length
  );

  const displayedCardIds = ownedCards
    .map(({ id }) => id)
    .concat(Object.keys(addedMap));
  const unlistedSets = cards.filter(({ id }) => !displayedCardIds.includes(id));

  return (
    <StyledWrapper>
      <EditIcon
        editingText={hasChanges ? 'Save' : 'Back'}
        editingIcon="save"
        onDiscard={hasChanges ? onResetEditing : undefined}
        isEditing={isEditing}
        onClick={() => {
          if (isEditing && hasChanges) onSaveChanges();
          setIsEditing(!isEditing);
        }}
      />
      {ownedCards.map(card => (
        <CardRow
          key={card.id}
          card={card}
          isEditing={isEditing}
          onChangeSet={onChangeSet}
          selectedCardId={selectedCardId}
          onChangeAmount={onChangeAmount(true)}
        />
      ))}
      {Boolean(Object.keys(addedMap).length) && (
        <Divider
          style={{
            fontSize: 14,
            fontWeight: 'normal',
          }}
        >
          New
        </Divider>
      )}
      {isEditing && (
        <>
          {Object.keys(addedMap).map(key => {
            const baseCardProps = cards.find(({ id }) => id === key);
            const card = {
              ...baseCardProps,
              ...addedMap[key],
              id: key,
            };

            return (
              <CardRow
                key={key}
                card={card}
                isEditing={isEditing}
                onChangeSet={onChangeSet}
                selectedCardId={selectedCardId}
                onChangeAmount={onChangeAmount(false)}
              />
            );
          })}
          <AddCard cards={unlistedSets} onAddCard={onAddCard} />
        </>
      )}
    </StyledWrapper>
  );
};
