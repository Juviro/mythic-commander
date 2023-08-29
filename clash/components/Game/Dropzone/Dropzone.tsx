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
  const [{ isOver }, dropRef] = useDrop({
    accept: 'CARD',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  if (disabled) {
    return <div>{children}</div>;
  }

  return (
    <div
      ref={dropRef}
      className={classNames(styles.wrapper, {
        [styles.is_over]: isOver,
      })}
    >
      {children}
    </div>
  );
};

export default Dropzone;
