import { useState } from 'react';

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

  const onSetLife = (playerId, newLife) => {
    const updatedPlayers = players.map(player => {
      if (player.id !== playerId) return player;
      return {
        ...player,
        life: newLife,
      };
    });
    setPlayers(updatedPlayers);
  };

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

  const onChangeName = (playerId, newName) => {
    const updatedPlayers = players.map(player => {
      if (player.id !== playerId) return player;
      return {
        ...player,
        name: newName,
      };
    });
    setPlayers(updatedPlayers);
  };

  return {
    players,
    onSetLife,
    onChangeName,
    onTrackDamage,
  };
};
