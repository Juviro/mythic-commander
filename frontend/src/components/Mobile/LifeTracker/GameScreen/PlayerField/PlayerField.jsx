import React from 'react';
import { Flex } from '../../../../Elements/Shared';
import NumberField from '../../NumberField/NumberField';

export default ({ player, onSetLife }) => {
  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      style={{
        flex: 1,
        height: '100%',
        border: '1px solid black',
        backgroundColor: 'white',
      }}
    >
      <NumberField value={player.life} setValue={val => onSetLife(player.id, val)} />
    </Flex>
  );
};
