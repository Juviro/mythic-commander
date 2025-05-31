import { useContext, useMemo } from 'react';
import { GameState, VisibleCard } from 'backend/database/gamestate.types';
import { useQuery } from 'react-query';
import GameStateContext from '../../GameStateContext';

const getFullCard = (cardId: string, gameState: GameState) => {
  let card: VisibleCard;

  gameState.players.find(({ zones }) => {
    return Object.values(zones).find((zone) => {
      return zone.find((zoneCard: VisibleCard) => {
        if (zoneCard.clashId !== cardId) return false;
        card = zoneCard;
        return true;
      });
    });
  });

  if (card!) {
    return card;
  }

  if (gameState.planechase?.activePlane.clashId === cardId) {
    return gameState.planechase.activePlane;
  }

  return null;
};

const fetchRules = async (cardId?: string) => {
  if (!cardId) return null;

  const response = await fetch(`https://api.scryfall.com/cards/${cardId}/rulings`);
  const json = await response.json();
  const rules: string[] = json.data.map(({ comment }: { comment: string }) => comment);
  return rules;
};

const useCardRules = (clashId: string | null) => {
  const { gameState } = useContext(GameStateContext);

  const card = useMemo(() => {
    return clashId ? getFullCard(clashId, gameState!) : null;
  }, [clashId]);

  const { data, isLoading } = useQuery(['card', card?.id], () => fetchRules(card?.id), {
    enabled: Boolean(card),
  });

  return {
    rules: data,
    card,
    isLoading,
  };
};

export default useCardRules;
