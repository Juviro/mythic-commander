import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import classNames from 'classnames';
import { DndItemType, DndItemTypes, DropCard } from 'types/dnd.types';
import styles from './Dropzone.module.css';
import CardPositionContext from '../CardPositionContext';

interface Props {
  children: ReactNode;
  onDrop: (card: DropCard, monitor: DropTargetMonitor) => void;
  disabled?: boolean;
  acceptFromPlayerId?: string;
  acceptedIds?: string[];
  playerId?: string;
  accept?: DndItemType[];
}

const Dropzone = ({
  children,
  onDrop,
  disabled,
  acceptFromPlayerId,
  acceptedIds,
  playerId,
  accept = [DndItemTypes.CARD, DndItemTypes.LIST_CARD],
}: Props) => {
  const { hoveredBattlefield } = useContext(CardPositionContext);
  const dropzoneRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept,
    canDrop: ({ ownerId, clashId }) => {
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
      className={styles.wrapper}
      ref={(val) => {
        dropRef(val);
        dropzoneRef.current = val!;
      }}
    >
      <div
        className={classNames(styles.dropzone, {
          [styles.dropzone__is_over]: isOver && canDrop,
          [styles.dropzone__can_drop]: canDrop,
        })}
      />
      {children}
    </div>
  );
};

export default Dropzone;
