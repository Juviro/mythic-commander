import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { PlusOutlined } from '@ant-design/icons';

import { GRID_CARD_WIDTH } from 'components/Elements/Shared/CardGrid/CardGrid';
import { CommanderPickerModal } from 'components/Elements/Shared/CommanderPicker/CommanderPickerModal';
import { useToggle } from '../../../Hooks';
import { setCommanderDesktop } from './queries';

// Mirrored from backend/src/graphql/resolvers/queries/Card.js
export const PARTNER_TYPES = {
  PARTNER: 'PARTNER',
  PARTNER_WITH: 'PARTNER_WITH',
  FRIENDS_FOREVER: 'FRIENDS_FOREVER',
  DOCTOR: 'DOCTOR',
  DOCTORS_COMPANION: 'DOCTORS_COMPANION',
  BACKGROUND_ENCHANTMENT: 'BACKGROUND_ENCHANTMENT',
  BACKGROUND_CREATURE: 'BACKGROUND_CREATURE',
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 48px;
`;

const StyledButton = styled(Button)`
  width: ${GRID_CARD_WIDTH}px;
  height: 306px;
  font-size: 24px;
  border-radius: 4%;
`;

const StyledLabel = styled.span`
  white-space: break-spaces;
`;

const getSecondCommanders = (cards, firstCommander) => {
  if (!firstCommander) return [];
  const { partner } = firstCommander;
  if (!partner) return [];

  const { partnersWith, partnerType } = partner;

  const otherCards = cards.filter((card) => card.id !== firstCommander.id);

  if (partnerType === PARTNER_TYPES.PARTNER_WITH) {
    return otherCards.filter((card) => card.name === partnersWith);
  }

  return otherCards.filter((card) => card.partner?.partnerType === partnersWith);
};

export default ({ deck }) => {
  const [isEditing, toggleIsEditing] = useToggle();
  const [mutate] = useMutation(setCommanderDesktop);
  const commanders = deck.cards.filter(({ isCommander }) => isCommander);
  const [firstCommander, secondCommander] = commanders;

  if (!deck?.canEdit) return null;

  const onSetCommanders = (cardIds) => {
    const newCards = deck.originalCards.map((card) => ({
      ...card,
      isCommander: cardIds.includes(card.card.id),
    }));
    mutate({
      variables: {
        cardIds,
        deckId: deck.id,
      },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        setCommander: {
          ...deck,
          cards: newCards,
        },
      }),
    });
  };

  const possibleFirstCommanders = deck.cards.filter((card) => card.canBeCommander);
  const possibleSecondCommanders = getSecondCommanders(deck.cards, firstCommander);

  const onPickCommander = (cardId) => {
    toggleIsEditing(false);
    if (firstCommander && firstCommander.id === cardId) return;
    if (firstCommander) {
      onSetCommanders([firstCommander.id, cardId]);
      return;
    }
    onSetCommanders([cardId]);
  };

  const isFirstCommander = !firstCommander;
  const commanderChoices = isFirstCommander
    ? possibleFirstCommanders
    : possibleSecondCommanders;

  if (firstCommander && (secondCommander || !firstCommander.partner)) {
    return null;
  }

  const isPartnerWith =
    firstCommander?.partner?.partnerType === PARTNER_TYPES.PARTNER_WITH;

  const onEdit = () => {
    if (isPartnerWith && possibleSecondCommanders.length === 1) {
      onPickCommander(possibleSecondCommanders[0].id);
      return;
    }
    toggleIsEditing();
  };

  const getLabel = () => {
    if (!firstCommander) {
      return 'Pick your Commander';
    }
    if (firstCommander?.partner?.partnersWith === PARTNER_TYPES.BACKGROUND_ENCHANTMENT) {
      return 'Add a Background';
    }
    if (firstCommander?.partner?.partnersWith === PARTNER_TYPES.DOCTORS_COMPANION) {
      return 'Add a Companion';
    }
    if (firstCommander?.partner?.partnersWith === PARTNER_TYPES.DOCTOR) {
      return 'Add a Doctor';
    }
    if (firstCommander?.partner?.partnersWith === PARTNER_TYPES.FRIENDS_FOREVER) {
      return 'Add a Friend';
    }
    if (isPartnerWith) {
      return `Add "${firstCommander.partner.partnersWith}"`;
    }

    return 'Add a Partner Commander';
  };

  const label = getLabel();

  return (
    <>
      <StyledWrapper>
        <StyledButton type="primary" ghost onClick={onEdit}>
          <Space direction="vertical" size={24}>
            <PlusOutlined style={{ fontSize: 40 }} />
            <StyledLabel>{label}</StyledLabel>
          </Space>
        </StyledButton>
      </StyledWrapper>
      <CommanderPickerModal
        label={label}
        commanderChoices={commanderChoices}
        onPickCommander={onPickCommander}
        onCancel={() => toggleIsEditing(false)}
        visible={isEditing}
      />
    </>
  );
};
