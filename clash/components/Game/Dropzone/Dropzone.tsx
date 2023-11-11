import React, { ReactNode } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import classNames from 'classnames';
import styles from './Dropzone.module.css';

export interface DropCard {
  clashId: string;
}

interface Props {
  children: ReactNode;
  onDrop: (card: DropCard, monitor: DropTargetMonitor) => void;
  disabled?: boolean;
}

const Dropzone = ({ children, onDrop, disabled }: Props) => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: 'CARD',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  if (disabled) {
    return <div>{children}</div>;
  }

  return (
    <div className={styles.wrapper} ref={dropRef}>
      <div
        className={classNames(styles.dropzone, {
          [styles.dropzone__is_over]: isOver,
          [styles.dropzone__can_drop]: canDrop,
        })}
      />
      {children}
    </div>
  );
};

export default Dropzone;
