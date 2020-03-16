import React from 'react';
import { Select, List, message } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { editDeckCard } from '../../queries';

const StyledHeader = styled.span`
  margin-bottom: 8px;
  display: flex;
  align-self: flex-start;
`;

// TODO: unify this with ChangeImage as they share a lot of code
export default ({ deck }) => {
  // TODO: Add support for partner commanders
  const [editMutation] = useMutation(editDeckCard);

  // TODO: Add support for planeswalker commanders
  const possibleCommanders = deck.cards.filter(card =>
    ['Legendary', 'Creature'].every(type => card.primaryTypes.includes(type))
  );
  const currentCommander =
    deck.cards.find(card => card.zone === 'COMMANDER') || {};

  const onSetCommander = async newCommanderId => {
    const changeZone = (cardId, zone) => {
      return editMutation({
        variables: { cardId, deckId: deck.id, newProps: { zone } },
      });
    };

    await changeZone(newCommanderId, 'COMMANDER');
    if (currentCommander.id) {
      await changeZone(currentCommander.id, 'MAINBOARD');
    }
    message.success('Commander changed!');
  };

  return (
    <List.Item
      style={{ padding: 16, display: 'flex', flexDirection: 'column' }}
    >
      <StyledHeader>Your Commander:</StyledHeader>
      <Select
        defaultValue={currentCommander.id}
        style={{ width: '100%' }}
        onSelect={onSetCommander}
      >
        {possibleCommanders.map(card => (
          <Select.Option value={card.id} key={card.id}>
            {card.name}
          </Select.Option>
        ))}
      </Select>
    </List.Item>
  );
};
