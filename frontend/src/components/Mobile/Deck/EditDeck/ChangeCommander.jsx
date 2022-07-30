import React from 'react';
import { Select, List, message } from 'antd';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { editDeckCard } from '../queries';

const StyledHeader = styled.span`
  margin-bottom: 8px;
  display: flex;
  align-self: flex-start;
`;

export default ({ deck }) => {
  // TODO: Add support for partner commanders
  const [editMutation] = useMutation(editDeckCard);

  // TODO: Add support for planeswalker commanders
  const possibleCommanders = deck.cards.filter((card) =>
    ['Legendary', 'Creature'].every((type) => card.primaryTypes.includes(type))
  );
  const currentCommander = deck.cards.find((card) => card.isCommander) || {};

  const onSetCommander = async (newCommanderId) => {
    const changeZone = (cardId, isCommander) => {
      return editMutation({
        variables: { cardId, deckId: deck.id, newProps: { isCommander } },
      });
    };

    await changeZone(newCommanderId, true);
    if (currentCommander.id) {
      await changeZone(currentCommander.id, false);
    }
    message.success('Commander changed!');
  };

  return (
    <List.Item style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledHeader>Your Commander:</StyledHeader>
      <Select
        defaultValue={currentCommander.id}
        style={{ width: '100%' }}
        onSelect={onSetCommander}
      >
        {possibleCommanders.map((card) => (
          <Select.Option value={card.id} key={card.id}>
            {card.name}
          </Select.Option>
        ))}
      </Select>
    </List.Item>
  );
};
