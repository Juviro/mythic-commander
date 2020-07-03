import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider, message } from 'antd';
import { useMutation } from 'react-apollo';

import { SaveOutlined } from '@ant-design/icons';
import { EditIcon } from '../../../Elements/Shared';
import AddCard from './AddCard';
import CardRow from './CardRow';
import { changeCollection } from './queries';
import { getCardByOracleId } from '../queries';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 12px;
  flex-direction: column;
`;

export default ({ cardOracleId, cards, onChangeSet, selectedCardId }) => {
  const ownedCards = cards.filter(
    ({ amountOwned, amountOwnedFoil }) => amountOwned + amountOwnedFoil
  );

  const [mutate] = useMutation(changeCollection);
  const [isEditing, setIsEditing] = useState(!ownedCards.length);
  const [editedMap, setEditedMap] = useState({});
  const [addedMap, setAddedMap] = useState({});

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
        cardOracleId,
        edited,
        added,
      },
      refetchQueries: [
        {
          query: getCardByOracleId,
          variables: { oracle_id: cardOracleId },
        },

        'ownedCardNames',
      ],
    });
    message.success('Updated your collection!');
    onResetEditing();
  };

  const onChangeAmount = cardAlreadyOwned => (amountOwned, cardId, isFoil) => {
    const key = isFoil ? 'amountOwnedFoil' : 'amountOwned';
    const [currentValue, setMethod] = cardAlreadyOwned
      ? [editedMap, setEditedMap]
      : [addedMap, setAddedMap];
    setMethod({
      ...currentValue,
      [cardId]: {
        ...currentValue[cardId],
        [key]: Math.max(Number(amountOwned), 0),
      },
    });
  };

  const onAddCard = id => {
    setAddedMap({
      ...addedMap,
      [id]: { amountOwned: 1, amountOwnedFoil: 0 },
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
        editingIcon={SaveOutlined}
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
