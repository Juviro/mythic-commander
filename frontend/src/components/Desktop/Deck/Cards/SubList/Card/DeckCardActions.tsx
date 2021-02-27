import React, { RefObject, SyntheticEvent } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { useMutation } from 'react-apollo';
import { useParams } from 'react-router';
import styled from 'styled-components';

import { editDeckCardDesktop, getDeckDesktop } from 'components/Desktop/Deck/queries';
import { EditCardModal } from 'components/Elements/Shared';
import { useShortcut, useToggle } from 'components/Hooks';
import { error, primary } from 'constants/colors';
import { Deck } from 'types/graphql';
import { UnifiedDeckCard } from 'types/unifiedTypes';
import keySymbols from 'constants/keySymbols';

const StyledScrollWrapper = styled.div`
  height: 200px;
  position: absolute;
`;

const StyledSpacer = styled(Space)<{ isSelected: boolean }>`
  display: ${({ isSelected }) => (isSelected ? 'inherit' : 'none')};
  font-size: 16px;
`;

interface Props {
  scrollRef: RefObject<HTMLDivElement>;
  card: UnifiedDeckCard;
  isSelected: boolean;
  onDelete: () => void;
}

export default ({ card, scrollRef, isSelected, onDelete }: Props) => {
  const { id: deckId } = useParams<{ id: string }>();
  const [isEditing, toggleIsEditing] = useToggle();
  const [mutateEdit] = useMutation(editDeckCardDesktop);
  useShortcut('e', toggleIsEditing, 'deck.cards');

  const onEditCard = (cardId, newProps) => {
    mutateEdit({
      variables: { deckId, newProps, cardId },
      update: (cache, { data: { editDeckCard: newCard } }) => {
        const existing = cache.readQuery<{ deck: Deck }>({
          query: getDeckDesktop,
          variables: { id: deckId },
        });

        const newCards = existing.deck.cards.map((deckCard) => {
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

  const onToggleEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    toggleIsEditing();
  };

  return (
    <>
      <StyledSpacer className="deck-card-actions" isSelected={isSelected}>
        <Tooltip title="Edit [E]">
          <EditOutlined onClick={toggleIsEditing} style={{ color: primary }} />
        </Tooltip>
        <Tooltip title={`Delete [${keySymbols.BACKSPACE}]`}>
          <DeleteOutlined onClick={onDelete} style={{ color: error }} />
        </Tooltip>
      </StyledSpacer>
      <StyledScrollWrapper ref={scrollRef} />
      {isEditing && (
        <EditCardModal card={card} onCancel={toggleIsEditing} onEdit={onEditCard} />
      )}
    </>
  );
};
