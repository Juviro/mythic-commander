import { useContext, RefObject, useEffect } from 'react';

import useSettings from 'components/Game/Menu/GameInfo/GuideModal/Settings/useSettings';
import { Player } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import useOrganizeLands from './useOrganizeLands';

interface Props {
  battlefieldRef: RefObject<HTMLDivElement>;
  player: Player;
}

const useAutoOrganizeLands = ({ battlefieldRef, player }: Props) => {
  const [settings] = useSettings();
  const { organizeLands, cardsToOrder } = useOrganizeLands({ player, battlefieldRef });
  const { player: self } = useContext(GameStateContext);

  const isSelf = player.id === self?.id;

  const cardIds = cardsToOrder.map((card) => card.id);
  const sortedCardIds = cardIds.sort().join(',');

  useEffect(() => {
    if (!settings.autoOrganizeLands || !isSelf) return;

    organizeLands();
  }, [sortedCardIds]);
};

export default useAutoOrganizeLands;
