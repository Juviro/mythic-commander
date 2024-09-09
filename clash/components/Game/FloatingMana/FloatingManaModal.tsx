import React from 'react';

import { Player } from 'backend/database/gamestate.types';
import DraggableModal from 'components/Game/DraggableModal/DraggableModal';
import ColoredPlayerName from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import useFloatingMana from './useFloatingMana';
import FloatingManaSymbols from './FloatingManaSymbols';

interface Props {
  player: Player;
  isSelf?: boolean;
}

const FloatingManaModal = ({ player, isSelf }: Props) => {
  const { initialPosition, setInitialPosition, floatingMana, onClose } = useFloatingMana({
    player,
    isSelf,
  });

  if (!initialPosition || !floatingMana) return null;

  return (
    <DraggableModal
      onMove={setInitialPosition}
      initialPosition={initialPosition}
      title={
        <span>
          <ColoredPlayerName
            id={player.id}
            addGenetiveSuffix
            name={player.name}
            isSelf={isSelf}
          />{' '}
          Floating Mana
        </span>
      }
      onClose={isSelf ? onClose : undefined}
    >
      <FloatingManaSymbols canEdit={Boolean(isSelf)} floatingMana={floatingMana} />
    </DraggableModal>
  );
};

export default FloatingManaModal;
