import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { message, Typography } from 'antd';
import UserContext from 'components/Provider/UserProvider';
import { changeCollection, cardDetailsDesktop } from '../queries';
import { CardSetOverview, EditIcon } from '../../../Shared';
import { useToggle, useShortcut } from '../../../../Hooks';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledTitleWrapper = styled.div`
  display: flex;
  width: calc(100% - 20px);
  justify-content: space-between;
`;

export default ({ card, loading, selectedCardId, onChangeSet, showTitle }) => {
  const [mutate] = useMutation(changeCollection);
  const { user } = useContext(UserContext);
  const [isEditing, toggleIsEditing] = useToggle(false);
  const [editedMap, setEditedMap] = useState({});
  const [addedMap, setAddedMap] = useState({});
  useShortcut('e', () => toggleIsEditing(true), 'modal.cardDetails');

  const onDiscard = () => {
    setEditedMap({});
    setAddedMap({});
    toggleIsEditing(false);
  };

  useEffect(() => {
    onDiscard();
    // eslint-disable-next-line
  }, [card.oracle_id]);

  const onSaveChanges = async () => {
    if (!Object.keys({ ...editedMap, ...addedMap }).length) return;

    const edited = Object.keys(editedMap).map((id) => ({
      ...editedMap[id],
      id,
    }));
    const added = Object.keys(addedMap).map((id) => ({
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
      refetchQueries: [
        'currentSnapshots',
        'paginatedCollection',
        'ownedCardNames',
        {
          query: cardDetailsDesktop,
          variables: { oracle_id: card.oracle_id },
        },
      ],
    });
    message.success('Updated your collection!');
    onDiscard();
  };

  const onToggleEdit = () => {
    if (isEditing) {
      onSaveChanges();
    }
    toggleIsEditing();
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

  const { name, totalAmount } = card || {};
  let title = name;
  if (totalAmount) title += ` (${totalAmount} collected)`;
  if (loading) title = '';

  return (
    <StyledWrapper>
      <StyledTitleWrapper>
        {showTitle && (
          <Typography.Title level={4} style={{ userSelect: 'text' }}>
            {title}
          </Typography.Title>
        )}
      </StyledTitleWrapper>
      {user && (
        <EditIcon onClick={onToggleEdit} isEditing={isEditing} onDiscard={onDiscard} />
      )}
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
