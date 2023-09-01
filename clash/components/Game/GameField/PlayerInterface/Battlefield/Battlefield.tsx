import React, { useRef } from 'react';
import { DropTargetMonitor } from 'react-dnd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';
import styles from './Battlefield.module.css';
import BattlefieldCard from './BattlefieldCard';

interface Props {
  player: Player;
  isSelf?: boolean;
}

const Battlefield = ({ player, isSelf }: Props) => {
  const { onMoveCard } = useGameActions();
  const ref = useRef<HTMLDivElement>(null);

  const onDrop = ({ clashId }: DropCard, monitor: DropTargetMonitor) => {
    const { x, y } = monitor.getClientOffset() as { x: number; y: number };
    const { left, top } = ref.current!.getBoundingClientRect();
    const relativeX = x - left;
    const relativeY = y - top;
    let posX = (relativeX / ref.current!.clientWidth) * 100;
    let posY = (relativeY / ref.current!.clientHeight) * 100;
    if (!isSelf) {
      posX = 100 - posX;
      posY = 100 - posY;
    }

    onMoveCard(clashId, ZONES.BATTLEFIELD, player.id, { x: posX, y: posY });
  };

  const cards = player.zones.battlefield;

  return (
    <div className={`${styles.wrapper} battlefield`} ref={ref}>
      <Dropzone onDrop={onDrop}>
        {cards.map((card) => (
          <BattlefieldCard card={card} key={card.clashId} />
        ))}
      </Dropzone>
    </div>
  );
};

export default Battlefield;