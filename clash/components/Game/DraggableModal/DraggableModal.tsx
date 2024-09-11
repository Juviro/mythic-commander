import React, {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './DraggableModal.module.css';

interface Props extends PropsWithChildren {
  initialPosition?: { x: number; y: number };
  title?: ReactNode;
  onMove?: (position: { x: number; y: number }) => void;
  onClose?: () => void;
  noCloseTooltip?: string;
}

const DraggableModal = ({
  children,
  onMove,
  title,
  initialPosition = { x: 300, y: 300 },
  onClose,
  noCloseTooltip,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState(initialPosition);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const onStop = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - startPosition.x;
    const dy = e.clientY - startPosition.y;

    setCurrentPosition({
      x: currentPosition.x + dx,
      y: currentPosition.y + dy,
    });

    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDragging]);

  useEffect(() => {
    onMove?.(currentPosition);
  }, [currentPosition]);

  const style = {
    '--x': `${currentPosition.x}px`,
    '--y': `${currentPosition.y}px`,
  } as CSSProperties;

  return (
    <div className={styles.modal} style={style}>
      <div className={styles.header} onMouseDown={onMouseDown} onMouseUp={onStop}>
        {title && <h1 className={styles.title}>{title}</h1>}
        <Tooltip title={noCloseTooltip}>
          {onClose && (
            <CloseOutlined
              className={classNames({
                [styles.close_disabled]: noCloseTooltip,
              })}
              onClick={noCloseTooltip ? undefined : onClose}
            />
          )}
        </Tooltip>
      </div>
      <div className={styles.modal_content}>{children}</div>
    </div>
  );
};

export default DraggableModal;
