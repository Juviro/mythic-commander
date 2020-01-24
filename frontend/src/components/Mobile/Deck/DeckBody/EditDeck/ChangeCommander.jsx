import React from 'react';
import { Select, List } from 'antd';
import styled from 'styled-components';
import { useMutation } from 'react-apollo';

import { editDeckCard } from '../../../../../queries';

const StyledHeader = styled.span`
  margin-bottom: 8px;
`;

export default ({ deck }) => {
  // TODO: Add support for partner commanders
  const [editMutation] = useMutation(editDeckCard);

  // TODO: Add support for plainswalker commanders
  const possibleCommanders = deck.cards.filter(card =>
    ['Legendary', 'Creature'].every(type => card.primaryTypes.includes(type))
  );
  const currentCommander = deck.cards.find(card => card.zone === 'COMMANDER') || {};

  const onSetCommander = async oracleId => {
    const changeZone = (cardOracleId, zone) => {
      return editMutation({
        variables: { cardOracleId, deckId: deck.id, newProps: { zone } },
      });
    };

    await changeZone(oracleId, 'COMMANDER');
    if (currentCommander.id) {
      await changeZone(currentCommander.oracle_id, 'MAINBOARD');
    }
  };

  return (
    <List.Item style={{ padding: 16 }}>
      <StyledHeader>Your Commander:</StyledHeader>
      <Select defaultValue={currentCommander.oracle_id} style={{ width: '100%' }} onSelect={onSetCommander}>
        {possibleCommanders.map(card => (
          <Select.Option value={card.oracle_id} key={card.id}>
            {card.name}
          </Select.Option>
        ))}
      </Select>
    </List.Item>
  );
};
