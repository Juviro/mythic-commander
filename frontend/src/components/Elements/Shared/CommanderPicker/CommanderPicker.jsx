import React from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';
import { PlusOutlined } from '@ant-design/icons';

import { GRID_CARD_WIDTH } from 'components/Elements/Shared/CardGrid/CardGrid';
import { CommanderPickerModal } from 'components/Elements/Shared/CommanderPicker/CommanderPickerModal';
import { useToggle } from '../../../Hooks';
import { setCommanderDesktop } from './queries';

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
  const { possiblePartner } = firstCommander;
  if (!possiblePartner) return [];

  if (possiblePartner === 'ALL') {
    return cards.filter(
      (card) => card.id !== firstCommander.id && card.possiblePartner === 'ALL'
    );
  }

  return cards.filter((card) => card.name === possiblePartner);
};

export default ({ deck }) => {
  const [isEditing, toggleIsEditing] = useToggle();
  const [mutate] = useMutation(setCommanderDesktop);
  const commanders = deck.cards.filter(({ isCommander }) => isCommander);
  const [firstCommander, secondCommander] = commanders;

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

  const possibleFirstCommanders = deck.cards.filter((card) =>
    ['Legendary', 'Creature'].every((type) => card.primaryTypes.includes(type))
  );
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

  if (firstCommander && (secondCommander || !firstCommander.possiblePartner)) {
    return null;
  }

  const label = isFirstCommander ? 'Pick your Commander' : 'Pick your Partner Commander';

  return (
    <>
      <StyledWrapper>
        <StyledButton type="primary" ghost onClick={toggleIsEditing}>
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
