import React, { useRef } from 'react';
import { DropTargetMonitor } from 'react-dnd';

import { Player, ZONES } from 'backend/database/gamestate.types';
import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';
import styles from './Battlefield.module.css';
import BattlefieldCard from './BattlefieldCard';

// const GRID_ELEMENTS_X = 20;
// const GRID_ELEMENTS_Y = 10;
// const GRID_STEP_X = 100 / GRID_ELEMENTS_X;
// const GRID_STEP_Y = 100 / GRID_ELEMENTS_Y;

// const snapToGrid = (x: number, y: number) => {
//   const snappedX = Math.round(x / GRID_STEP_X) * GRID_STEP_X;
//   const snappedY = Math.round(y / GRID_STEP_Y) * GRID_STEP_Y;

//   return [snappedX, snappedY];
// };

interface Props {
  player: Player;
  isFlipped?: boolean;
}

const Battlefield = ({ player, isFlipped }: Props) => {
  const { onMoveCard } = useGameActions();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onDrop = ({ clashId }: DropCard, monitor: DropTargetMonitor) => {
    const { x, y } = monitor.getClientOffset() as { x: number; y: number };
    const { left, top } = wrapperRef.current!.getBoundingClientRect();
    const relativeX = x - left;
    const relativeY = y - top;
    let posX = (relativeX / wrapperRef.current!.clientWidth) * 100;
    let posY = (relativeY / wrapperRef.current!.clientHeight) * 100;
    if (isFlipped) {
      posX = 100 - posX;
      posY = 100 - posY;
    }
    // const [snappedX, snappedY] = snapToGrid(posX, posY);

    const position = { x: posX, y: posY };

    onMoveCard(clashId, ZONES.BATTLEFIELD, player.id, { position });
  };

  const cards = player.zones.battlefield;

  return (
    <div className={`${styles.wrapper} battlefield`} ref={wrapperRef}>
      <Dropzone onDrop={onDrop}>
        {cards.map((card) => (
          <BattlefieldCard card={card} key={card.clashId} />
        ))}
      </Dropzone>
    </div>
  );
};

export default Battlefield;
