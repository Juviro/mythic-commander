import { useState, useMemo, useEffect } from 'react';
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

export default (gameSettings, initialGameState) => {
  const isRejoinedGame = Boolean(initialGameState?.players?.length);
  const initialPlayers = useMemo(() => {
    if (initialGameState?.players?.length) return initialGameState.players;
    return getInitialPlayers(gameSettings);
  }, []);

  const [players, setPlayers] = useState(initialPlayers);
  console.log('players', players);
  const { highlightedPlayerId, onSelectRandomPlayer, isLoading } = useSelectPlayer(
    initialPlayers,
    isRejoinedGame
  );

  useEffect(() => {
    if (!initialGameState?.players?.length) return;
    setPlayers(initialGameState.players);
  }, [initialGameState]);

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
    let lifeDelta = 0;
    const updatedPlayers = players.map((player) => {
      if (player.id !== playerId) return player;

      const playerWithUpdatedDamage = {
        ...player,
        damageTaken: player.damageTaken.map((originPlayer) => {
          const updatedplayer = newPlayerDamages.find(({ id }) => id === originPlayer.id);
          if (!updatedplayer) return originPlayer;

          if (updatedplayer.id !== INFECT) {
            lifeDelta += updatedplayer.damage - originPlayer.damage;
          }

          return {
            ...originPlayer,
            damage: updatedplayer.damage,
          };
        }),
      };

      if (gameSettings.reduceLifeOnCommanderDmg) {
        playerWithUpdatedDamage.life -= lifeDelta;
      }

      return playerWithUpdatedDamage;
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
