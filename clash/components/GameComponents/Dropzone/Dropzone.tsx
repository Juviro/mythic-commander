import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import classNames from 'classnames';
import { DndItemType, DndItemTypes, DropCard, DropCardGroup } from 'types/dnd.types';
import CardPositionContext from 'components/Game/CardPositionContext';
import styles from './Dropzone.module.css';

interface Props {
  children: ReactNode;
  onDrop: (card: DropCard & DropCardGroup, monitor: DropTargetMonitor) => void;
  disabled?: boolean;
  acceptFromPlayerId?: string;
  acceptedIds?: string[];
  playerId?: string;
  accept?: DndItemType[];
  noIsOverStyle?: boolean;
  id?: string;
}

const Dropzone = ({
  children,
  onDrop,
  disabled,
  acceptFromPlayerId,
  acceptedIds,
  playerId,
  accept = [DndItemTypes.CARD, DndItemTypes.LIST_CARD],
  noIsOverStyle,
  id,
}: Props) => {
  const { hoveredBattlefield } = useContext(CardPositionContext);
  const dropzoneRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept,
    canDrop: (dropElement) => {
      if ('cardIds' in dropElement) {
        return true;
      }
      const { clashId, ownerId } = dropElement;
      if (acceptedIds && !acceptedIds.includes(clashId)) {
        return false;
      }
      return !acceptFromPlayerId || ownerId === acceptFromPlayerId;
    },
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  useEffect(() => {
    if (!playerId) return;

    if (isOver && hoveredBattlefield.current?.playerId !== playerId) {
      hoveredBattlefield.current = { playerId, element: dropzoneRef.current! };
      return;
    }
    if (!isOver && hoveredBattlefield.current?.playerId === playerId) {
      hoveredBattlefield.current = null;
    }
  }, [isOver]);

  if (disabled) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div
      className={classNames(styles.wrapper, {
        'dropzone--is_over': isOver && canDrop,
        'dropzone--can_drop': canDrop,
      })}
      id={id}
      ref={(val) => {
        dropRef(val);
        dropzoneRef.current = val!;
      }}
    >
      <div
        className={classNames(styles.dropzone, {
          [styles.dropzone__is_over]: !noIsOverStyle && isOver && canDrop,
          [styles.dropzone__can_drop]: canDrop,
        })}
      />
      {children}
    </div>
  );
};

export default Dropzone;
