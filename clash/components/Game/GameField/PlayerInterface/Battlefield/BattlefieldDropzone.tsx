import React, { PropsWithChildren, useContext } from 'react';
import { DropTargetMonitor } from 'react-dnd';

import Dropzone, { DropCard } from 'components/Game/Dropzone/Dropzone';
import useGameActions from 'components/Game/useGameActions';
import { Player, ZONES } from 'backend/database/gamestate.types';
import CardPositionContext from 'components/Game/CardPositionContext';

interface Props extends PropsWithChildren {
  player: Player;
  isFlipped?: boolean;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

const BattlefieldDropzone = ({ children, player, wrapperRef, isFlipped }: Props) => {
  const { onMoveCard } = useGameActions();
  const { snapChoords } = useContext(CardPositionContext);

  const onDrop = ({ clashId }: DropCard, monitor: DropTargetMonitor) => {
    let { x, y } = monitor.getClientOffset() as { x: number; y: number };
    if (snapChoords.current.x !== null) {
      x = snapChoords.current.x;
      snapChoords.current.x = null;
    }
    if (snapChoords.current.y !== null) {
      y = snapChoords.current.y;
      snapChoords.current.y = null;
    }

    const { left, top } = wrapperRef.current!.getBoundingClientRect();
    const relativeX = x - left;
    const relativeY = y - top;
    let posX = (relativeX / wrapperRef.current!.clientWidth) * 100;
    let posY = (relativeY / wrapperRef.current!.clientHeight) * 100;

    if (isFlipped) {
      posX = 100 - posX;
      posY = 100 - posY;
    }

    const position = { x: posX, y: posY };

    onMoveCard(clashId, ZONES.BATTLEFIELD, player.id, { position });
  };

  return (
    <Dropzone onDrop={onDrop} playerId={player.id}>
      {children}
    </Dropzone>
  );
};

export default BattlefieldDropzone;
