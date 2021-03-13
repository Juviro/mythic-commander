import { useState, useMemo } from 'react';
import { randomImages } from '../../../../constants/images';
import { lifeTracker } from '../../../../constants/colors';
import useSelectPlayer from './useSelectPlayer';

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
    .filter((playerId) => playerId !== id)
    .map((playerId) => ({ id: playerId, damage: 0 }))
    .concat(defaultDamage);
};

const getInitialPlayers = ({ numberOfPlayers, startingLife, useImages }) => {
  const playerIds = fillArrayWith(numberOfPlayers, getRandomId);
  const getPlayer = (id, index) => ({
    id,
    name: `Player ${index + 1}`,
    color: !useImages ? lifeTracker[index] : null,
    img: useImages ? randomImages[index] : null,
    life: startingLife,
    damageTaken: getDamageTaken(id, playerIds),
  });

  return playerIds.map(getPlayer);
};

export default (gameSettings) => {
  // eslint-disable-next-line
  const initialPlayers = useMemo(() => getInitialPlayers(gameSettings), []);
  const [players, setPlayers] = useState(initialPlayers);
  const { highlightedPlayerId, onSelectRandomPlayer, isLoading } = useSelectPlayer(
    initialPlayers
  );

  const onUpdatePlayer = (playerId, newValues) => {
    const updatedPlayers = players.map((player) => {
      if (player.id !== playerId) return player;

      return {
        ...player,
        ...newValues,
      };
    });
    setPlayers(updatedPlayers);
  };

  const onSetLife = (playerId, life) => onUpdatePlayer(playerId, { life });

  const onTrackDamage = (playerId, newPlayerDamages) => {
    const updatedPlayers = players.map((player) => {
      if (player.id !== playerId) return player;
      return {
        ...player,
        damageTaken: player.damageTaken.map((originPlayer) => {
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
    const newPlayers = players.map((player) => ({
      ...player,
      life: gameSettings.startingLife,
      damageTaken: getDamageTaken(player.id, playerIds),
    }));
    setPlayers(newPlayers);
    onSelectRandomPlayer();
  };

  return {
    players,
    isLoading,
    onSetLife,
    onTrackDamage,
    onRestartGame,
    onUpdatePlayer,
    highlightedPlayerId,
  };
};
