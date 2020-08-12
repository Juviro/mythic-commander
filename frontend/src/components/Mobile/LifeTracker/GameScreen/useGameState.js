import { useState } from 'react';
import { randomImages } from '../../../../constants/images';

export const INFECT = 'INFECT';

const getRandomId = () => Math.random().toString();

const fillArrayWith = (arrayLength, fillFunction) => {
  return new Array(arrayLength).fill(null).map(fillFunction);
};

const getDamageTaken = (id, playerIds) => {
  const defaultDamage = [
    {
      id: INFECT,
      damage: 0,
    },
  ];

  return playerIds
    .filter(playerId => playerId !== id)
    .map(playerId => ({ id: playerId, damage: 0 }))
    .concat(defaultDamage);
};

const getInitialPlayers = ({ numberOfPlayers, startingLife }) => {
  const playerIds = fillArrayWith(numberOfPlayers, getRandomId);
  const getPlayer = (id, index) => ({
    id,
    name: `Player ${index + 1}`,
    color: null,
    img: randomImages[index],
    life: startingLife,
    damageTaken: getDamageTaken(id, playerIds),
  });

  return playerIds.map(getPlayer);
};

export default gameSettings => {
  const [players, setPlayers] = useState(getInitialPlayers(gameSettings));

  const onUpdatePlayer = (playerId, newValues) => {
    const updatedPlayers = players.map(player => {
      if (player.id !== playerId) return player;

      return {
        ...player,
        ...newValues,
      };
    });
    setPlayers(updatedPlayers);
  };

  const onSetLife = (playerId, life) => onUpdatePlayer(playerId, { life });

  // @param {string} origin: either INFECT or playerId
  const onTrackDamage = (playerId, newPlayerDamages) => {
    const updatedPlayers = players.map(player => {
      if (player.id !== playerId) return player;
      return {
        ...player,
        damageTaken: player.damageTaken.map(originPlayer => {
          const updatedplayer = newPlayerDamages.find(({ id }) => id === originPlayer.id);
          if (!updatedplayer) return originPlayer;

          return {
            ...originPlayer,
            damage: updatedplayer.damage,
          };
        }),
      };
    });
    setPlayers(updatedPlayers);
  };

  const onRestartGame = () => {
    const playerIds = players.map(({ id }) => id);
    const newPlayers = players.map(player => ({
      ...player,
      life: gameSettings.startingLife,
      damageTaken: getDamageTaken(player.id, playerIds),
    }));
    setPlayers(newPlayers);
  };

  return {
    players,
    onSetLife,
    onTrackDamage,
    onRestartGame,
    onUpdatePlayer,
  };
};
