import React, { ReactNode } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import classNames from 'classnames';
import styles from './Dropzone.module.css';

export interface DropCard {
  clashId: string;
  ownerId?: string;
}

interface Props {
  children: ReactNode;
  onDrop: (card: DropCard, monitor: DropTargetMonitor) => void;
  disabled?: boolean;
  acceptFromPlayerId?: string;
  acceptedIds?: string[];
}

const Dropzone = ({
  children,
  onDrop,
  disabled,
  acceptFromPlayerId,
  acceptedIds,
}: Props) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'CARD',
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

  if (disabled) {
    return children;
  }

  return (
    <div className={styles.wrapper} ref={dropRef}>
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
