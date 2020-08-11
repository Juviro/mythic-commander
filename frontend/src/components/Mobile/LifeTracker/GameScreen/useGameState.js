import { useState } from 'react';
import { randomImages } from '../../../../constants/images';

export const INFECT = 'INFECT';

const getRandomId = () => Math.random().toString();

const fillArrayWith = (arrayLength, fillFunction) => {
  return new Array(arrayLength).fill(null).map(fillFunction);
};

const getInitialPlayers = ({ numberOfPlayers, startingLife }) => {
  const playerIds = fillArrayWith(numberOfPlayers, getRandomId);
  const getPlayer = (id, index) => ({
    id,
    name: `Player ${index + 1}`,
    color: null,
    img: randomImages[index],
    life: startingLife,
    damageTaken: {
      players: playerIds
        .filter(playerId => playerId !== id)
        .map(playerId => ({ id: playerId, damage: 0 })),
      infect: 0,
    },
  });

  return playerIds.map(getPlayer);
};

export default gameSettings => {
  const [players, setPlayers] = useState(getInitialPlayers(gameSettings));

  const updatePlayer = (playerId, newValues) => {
    const updatedPlayers = players.map(player => {
      if (player.id !== playerId) return player;

      return {
        ...player,
        ...newValues,
      };
    });
    setPlayers(updatedPlayers);
  };

  const onSetLife = (playerId, life) => updatePlayer(playerId, { life });

  // @param {string} origin: either INFECT or playerId
  const onTrackDamage = (playerId, newValue, origin) => {
    const updatedPlayers = players.map(player => {
      if (player.id !== playerId) return player;
      if (origin === INFECT) {
        return {
          ...player,
          damageTaken: {
            ...player.damageTaken,
            infect: newValue,
          },
        };
      }
      return {
        ...player,
        damageTaken: {
          ...player.damageTaken,
          players: player.damageTaken.players.map(originPlayer => {
            if (originPlayer.id !== origin) return originPlayer;
            return {
              ...originPlayer,
              damage: newValue,
            };
          }),
        },
      };
    });
    setPlayers(updatedPlayers);
  };

  // @param {{img, color, name}} updatedPlayer
  const onUpdatePlayer = (playerId, updatedPlayer) => {
    updatePlayer(playerId, updatedPlayer);
  };

  return {
    players,
    onSetLife,
    onUpdatePlayer,
    onTrackDamage,
  };
};
