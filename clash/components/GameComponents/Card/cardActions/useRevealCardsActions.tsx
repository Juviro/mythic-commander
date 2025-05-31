import GameStateContext from 'components/Game/GameStateContext';
import useGameActions from 'components/Game/useGameActions';
import { useContext } from 'react';

interface Props {
  cardIds: string[];
}

const useRevealCardsActions = ({ cardIds }: Props) => {
  const { gameState, player: self } = useContext(GameStateContext);
  const { onRevealCardsFromHand } = useGameActions();

  const onRevealCards = (toPlayerIds?: string[]) => {
    const allPlayerIds = gameState!.players
      .map((player) => player.id)
      .filter((id) => id !== self!.id);

    onRevealCardsFromHand({
      cardIds,
      toPlayerIds: toPlayerIds || allPlayerIds,
    });
  };

  const moveCardActions = [
    {
      key: 'everyone',
      label: 'Everyone',
      onClick: () => onRevealCards(),
    },
  ];

  gameState!.players.forEach((player) => {
    if (player.id === self!.id) return;

    moveCardActions.push({
      key: player.id,
      label: player.name,
      onClick: () => onRevealCards([player.id]),
    });
  });

  return moveCardActions;
};

export default useRevealCardsActions;
