import React from 'react';
import styled from 'styled-components';
import { Typography, Button } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import { Flex, EditCardModal } from '../../../../../Elements/Shared';

import { getPriceLabel } from '../../../../../../utils/cardStats';
import keySymbols from '../../../../../../constants/keySymbols';
import { useToggle, useShortcut } from '../../../../../Hooks';
import { editDeckCardDesktop, getDeckDesktop } from '../../../queries';

const StyledButton = styled(Button)`
  margin-top: 8px;
`;

export default ({ card, onOpenDetails, onDelete }) => {
  const { id: deckId } = useParams();
  const amount = `${card.amount}x`;
  const value = getPriceLabel(card.minPrice);
  const [isEditing, toggleIsEditing] = useToggle();
  const [mutateEdit] = useMutation(editDeckCardDesktop);
  useShortcut('e', toggleIsEditing, 'deck.cards');

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { deckId, newProps, cardId },
      update: (cache, { data: { editDeckCard: newCard } }) => {
        const existing = cache.readQuery({
          query: getDeckDesktop,
          variables: { id: deckId },
        });

        const newCards = existing.deck.cards.map(deckCard => {
          if (deckCard.card.id !== cardId) return deckCard;
          return newCard;
        });

        cache.writeQuery({
          query: getDeckDesktop,
          data: {
            deck: {
              ...existing.deck,
              cards: newCards,
            },
          },
        });
      },
    });
  };

  return (
    <>
      <Flex direction="column" style={{ marginTop: 4 }}>
        <Flex justify="space-between" style={{ padding: '0 8px' }}>
          <Typography.Text strong>{amount}</Typography.Text>
          <Typography.Text strong>{value}</Typography.Text>
        </Flex>
        <StyledButton type="link" onClick={onOpenDetails}>
          {`Details [${keySymbols.ENTER}]`}
        </StyledButton>
        <StyledButton type="link" onClick={toggleIsEditing}>
          Edit [E]
        </StyledButton>
        <StyledButton type="link" onClick={onDelete} danger>
          {`Delete [${keySymbols.BACKSPACE}]`}
        </StyledButton>
      </Flex>
      {isEditing && (
        <EditCardModal
          card={card}
          onCancel={toggleIsEditing}
          onEdit={onEditCard}
        />
      )}
    </>
  );
};
