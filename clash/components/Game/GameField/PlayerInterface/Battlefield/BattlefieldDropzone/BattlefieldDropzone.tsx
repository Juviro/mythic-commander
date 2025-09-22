import React, { PropsWithChildren } from 'react';
import { DropTargetMonitor } from 'react-dnd';

import { Player } from 'backend/database/gamestate.types';
import { DndItemTypes, DropCard, DropCardGroup } from 'types/dnd.types';
import Dropzone from 'components/GameComponents/Dropzone/Dropzone';
import useBattlefieldDropzone from './useBattlefieldDropzone';

interface Props extends PropsWithChildren {
  player: Player;
  isFlipped: boolean;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  id?: string;
}

const BattlefieldDropzone = ({ children, player, wrapperRef, isFlipped, id }: Props) => {
  const { moveCardGroup, moveSingleCard } = useBattlefieldDropzone({
    wrapperRef,
    isFlipped,
    player,
  });

  const onDrop = (item: DropCard | DropCardGroup, monitor: DropTargetMonitor) => {
    if ('clashId' in item) {
      moveSingleCard(item, monitor);
    } else {
      moveCardGroup(item, monitor);
    }
  };

  return (
    <Dropzone
      id={id}
      noIsOverStyle
      onDrop={onDrop}
      playerId={player.id}
      disabled={player.resigned}
      accept={[DndItemTypes.CARD, DndItemTypes.LIST_CARD, DndItemTypes.CARD_GROUP]}
    >
      {children}
    </Dropzone>
  );
};

export default BattlefieldDropzone;
