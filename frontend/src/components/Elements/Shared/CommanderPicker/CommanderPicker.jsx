import React, { useState } from 'react';
import { Typography, Button, Select } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

import { useMutation } from 'react-apollo';
import Flex from '../Flex';
import { useToggle } from '../../../Hooks';
import { setCommanderDesktop } from './queries';
import { primary } from '../../../../constants/colors';

const getSecondCommanders = (cards, firstCommander) => {
  if (!firstCommander) return [];
  const { possiblePartner } = firstCommander;
  if (!possiblePartner) return [];

  if (possiblePartner === 'ALL') {
    return cards.filter(
      card => card.id !== firstCommander.id && card.possiblePartner === 'ALL'
    );
  }

  return cards.filter(card => card.name === possiblePartner);
};

export default ({ deck }) => {
  const [isEditing, toggleIsEditing] = useToggle();
  const [mutate] = useMutation(setCommanderDesktop);
  const commanders = deck.cards.filter(({ isCommander }) => isCommander);
  const [firstCommander, secondCommander] = commanders;

  const onSetCommanders = cardIds => {
    const newCards = deck.originalCards.map(card => ({
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

  const onSetFirstCommander = cardId => {
    if (firstCommander && firstCommander.id === cardId) return;
    onSetCommanders([cardId]);
  };

  const onSetSecondCommander = cardId => {
    onSetCommanders([firstCommander.id, cardId]);
  };

  const possibleFirstCommanders = deck.cards.filter(card =>
    ['Legendary', 'Creature'].every(type => card.primaryTypes.includes(type))
  );
  const possibleSecondCommanders = getSecondCommanders(
    deck.cards,
    firstCommander
  );

  if (!commanders.length && !isEditing) {
    return (
      <Button
        type="link"
        icon={<PlusOutlined />}
        onClick={toggleIsEditing}
        style={{ width: 'fit-content', paddingLeft: 4 }}
      >
        Add a commander
      </Button>
    );
  }

  if (!isEditing) {
    return (
      <Flex direction="row" style={{ paddingLeft: 4 }}>
        <Flex direction="column">
          {commanders.map(commander => (
            <Typography.Text strong key={commander.id}>
              {commander.name}
            </Typography.Text>
          ))}
        </Flex>
        <EditOutlined
          onClick={toggleIsEditing}
          style={{ color: primary, margin: '4px 8px', fontSize: 16 }}
        />
      </Flex>
    );
  }

  return (
    <Flex direction="column" style={{ margin: '0 4px' }}>
      <Flex direction="row" align="center">
        <Select
          defaultValue={firstCommander && firstCommander.id}
          style={{ width: '100%' }}
          onSelect={onSetFirstCommander}
          size="small"
          placeholder="Pick your commander"
        >
          {possibleFirstCommanders.map(card => (
            <Select.Option value={card.id} key={card.id}>
              {card.name}
            </Select.Option>
          ))}
        </Select>
        <CheckOutlined
          onClick={toggleIsEditing}
          style={{ color: primary, marginLeft: 8, fontSize: 16 }}
        />
      </Flex>
      {Boolean(possibleSecondCommanders.length) && (
        <Select
          value={secondCommander && secondCommander.name}
          style={{ width: 'calc(100% - 24px)', marginTop: 6 }}
          onSelect={onSetSecondCommander}
          size="small"
          placeholder="Pick your second commander"
        >
          {possibleSecondCommanders.map(card => (
            <Select.Option value={card.id} key={card.id}>
              {card.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </Flex>
  );
};
