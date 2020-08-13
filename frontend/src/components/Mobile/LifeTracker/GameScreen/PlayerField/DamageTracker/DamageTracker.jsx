import React from 'react';

import { Flex } from '../../../../../Elements/Shared';
import DamageField, { DAMAGE_FIELD_SIZE } from './DamageField/DamageField';
import ShowAll from './ShowAll';
import { INFECT } from '../../useGameState';

const getMaxDisplayedPlayers = () => {
  // border size, show more fields
  const availableWidth = window.innerWidth - 4 - 2 * 25;
  return Math.floor(availableWidth / 2 / DAMAGE_FIELD_SIZE);
};

export default ({ player, players, onTrackDamage }) => {
  const playerDamage = player.damageTaken
    .map(({ id, damage }) => ({
      id,
      damage,
      ...players.find(({ id: playerId }) => playerId === id),
    }))
    .map(damage => {
      if (damage.id !== INFECT) return damage;
      return {
        ...damage,
        name: 'Infect',
      };
    });

  const maxDisplayedPlayers = getMaxDisplayedPlayers();
  const displayedPlayerDamage = playerDamage
    .filter(({ damage }) => damage)
    .sort((a, b) => {
      if (a.damage === b.damage) return 0;
      return b.damage - a.damage;
    })
    .slice(0, maxDisplayedPlayers);

  return (
    <Flex direction="column" style={{ alignSelf: 'flex-end' }}>
      {displayedPlayerDamage.map(({ id, damage, name }) => (
        <DamageField
          key={id}
          ownId={player.id}
          id={id}
          name={name}
          damage={damage}
          players={players}
          onTrackDamage={onTrackDamage}
        />
      ))}
      <ShowAll
        playerId={player.id}
        onTrackDamage={onTrackDamage}
        playerDamage={playerDamage}
      />
    </Flex>
  );
};
