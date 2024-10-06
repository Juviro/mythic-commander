import React from 'react';
import { Button } from 'antd';

import { Player } from 'backend/database/gamestate.types';
import ColoredPlayerName from 'components/GameComponents/ColoredPlayerName/ColoredPlayerName';
import DraggableModal from 'components/GameComponents/DraggableModal/DraggableModal';
import useFloatingMana from './useFloatingMana';
import FloatingManaSymbols from './FloatingManaSymbols';

import styles from './FloatingMana.module.css';

interface Props {
  player: Player;
  isSelf?: boolean;
}

const FloatingManaModal = ({ player, isSelf }: Props) => {
  const {
    initialPosition,
    setInitialPosition,
    floatingMana,
    onClose,
    onReset,
    visible,
    canReset,
  } = useFloatingMana({
    player,
    isSelf,
  });

  if (!initialPosition || !visible) return null;

  return (
    <DraggableModal
      onMove={setInitialPosition}
      initialPosition={initialPosition}
      additionalClassName={styles.modal}
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
      <FloatingManaSymbols canEdit={Boolean(isSelf)} floatingMana={floatingMana!} />
      <Button
        onClick={onReset}
        className={styles.reset_button}
        type="link"
        disabled={!canReset}
      >
        Reset
      </Button>
    </DraggableModal>
  );
};

export default FloatingManaModal;
