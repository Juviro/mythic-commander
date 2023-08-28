import React, { ReactNode } from 'react';
import { useDrop } from 'react-dnd';

import classNames from 'classnames';
import styles from './Dropzone.module.css';

interface Props {
  children: ReactNode;
  onDrop: (card: { clashId: string }) => void;
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
    return children;
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
