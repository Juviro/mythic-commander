import React, {
  CSSProperties,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { XYCoord } from 'react-dnd';

import styles from './DraggableModal.module.css';

interface Props extends PropsWithChildren {
  initialPosition?: XYCoord;
  title?: ReactNode;
  subtitle?: ReactNode;
  onMove?: (position: XYCoord) => void;
  onClose?: () => void;
  noCloseTooltip?: string;
  headerColor?: 'primary' | 'default';
  modalRef?: RefObject<HTMLDivElement>;
  closable?: boolean;
  additionalClassName?: string;
}

const DraggableModal = ({
  children,
  onMove,
  closable = true,
  title,
  initialPosition,
  onClose,
  noCloseTooltip,
  headerColor,
  subtitle,
  modalRef,
  additionalClassName,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState<XYCoord | null>(
    initialPosition ?? null
  );

  useEffect(() => {
    if (currentPosition) return;
    setCurrentPosition({
      x: window.innerWidth / 2 - 200,
      y: 50,
    });
  }, []);

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
      x: currentPosition!.x + dx,
      y: currentPosition!.y + dy,
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
    if (!currentPosition) return;
    onMove?.(currentPosition);
  }, [currentPosition]);

  if (!currentPosition) return null;

  const style = {
    '--x': `${currentPosition.x}px`,
    '--y': `${currentPosition.y}px`,
  } as CSSProperties;

  return (
    <div
      className={classNames(styles.modal, additionalClassName)}
      onContextMenu={(e) => e.stopPropagation()}
      style={style}
      ref={modalRef}
    >
      <div
        className={classNames(styles.header, {
          [styles.header__primary]: headerColor === 'primary',
        })}
        onMouseDown={onMouseDown}
        onMouseUp={onStop}
      >
        {title && (
          <div className={styles.title_wrapper}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
          </div>
        )}
        {closable && (
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
        )}
      </div>
      <div className={styles.modal_content}>{children}</div>
    </div>
  );
};

export default DraggableModal;
