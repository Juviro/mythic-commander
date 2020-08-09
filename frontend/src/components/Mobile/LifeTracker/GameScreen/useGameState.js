import { useState } from 'react';
import { lifeTracker } from '../../../../constants/colors';

export const INFECT = 'INFECT';

const getRandomId = () => Math.random().toString();

const fillArrayWith = (arrayLength, fillFunction) => {
  return new Array(arrayLength).fill(null).map(fillFunction);
};

const getImg = () => {
  return null;
  if (Math.random() > 0.3) return null;
  return 'https://img.scryfall.com/cards/art_crop/front/d/a/dada448c-6431-4172-b458-efa49c302dfb.jpg';
};

const getInitialPlayers = ({ numberOfPlayers, startingLife }) => {
  const playerIds = fillArrayWith(numberOfPlayers, getRandomId);
  const getPlayer = (id, index) => ({
    id,
    name: `Player ${index + 1}`,
    color: lifeTracker[index],
    img: getImg(),
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
