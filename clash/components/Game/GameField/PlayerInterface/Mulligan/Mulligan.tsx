import React, { useContext } from 'react';
import { Modal } from 'antd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import GameStateContext from 'components/Game/GameStateContext';
import LibraryExplorerCardList from 'components/GameComponents/LibraryExplorer/LibraryExplorerCardList';
import { getCardinalNumberLabel } from 'utils/i18nUtils';
import { DndItemTypes } from 'types/dnd.types';
import useMulligan from './useMulligan';

import styles from './Mulligan.module.css';

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Mulligan = ({ player, isSelf }: Props) => {
  const { getPlayerColor, gameState } = useContext(GameStateContext);

  const { toHand, toLibrary, onMoveCard, onTakeMulligan, onAcceptHand, loading } =
    useMulligan({
      player,
    });

  if (!isSelf) return null;

  const yourPosition = gameState!.players.findIndex((p) => p.id === player.id);

  const { mulligansTaken } = player.mulligan;

  const mulliganLabel = `Mulligan (${getCardinalNumberLabel(mulligansTaken + 1)})`;

  let title = `Pick your Starting Hand`;
  if (mulligansTaken > 0) {
    title += ` - Mulligan #${mulligansTaken}`;
  }
  const subTitle = `You go ${getCardinalNumberLabel(yourPosition + 1, true)}`;

  return (
    <Modal
      open
      className={styles.modal}
      maskClosable={false}
      closable={false}
      title={
        <div>
          <div>{title}</div>
          <div className={styles.modal_subtitle}>{subTitle}</div>
        </div>
      }
      width="fit-content"
      style={{ '--player-color': getPlayerColor(player.id) } as React.CSSProperties}
      okText="Take Hand"
      cancelText={mulliganLabel}
      onOk={onAcceptHand}
      onCancel={onTakeMulligan}
      okButtonProps={{
        loading,
      }}
      cancelButtonProps={{
        loading,
      }}
    >
      <div className={styles.content}>
        <LibraryExplorerCardList
          cards={toLibrary}
          onDrop={onMoveCard('library')}
          empty="Bottom of Library"
          zone={ZONES.HAND}
          cardDropType={DndItemTypes.MULLIGAN_CARD}
        />
        <LibraryExplorerCardList
          cards={toHand}
          onDrop={onMoveCard('hand')}
          // eslint-disable-next-line max-len
          empty="Your Hand is empty! Drag Cards here to that you want to put into your Hand"
          zone={ZONES.HAND}
          cardDropType="MULLIGAN_CARD"
        />
      </div>
    </Modal>
  );
};

export default Mulligan;
