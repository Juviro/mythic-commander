import React, { useContext, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import GameStateContext from 'components/Game/GameStateContext';
import { GameLog } from 'backend/constants/logMessages';
import { ReloadOutlined } from '@ant-design/icons';
import useGameActions from 'components/Game/useGameActions';
import ChatMessage from './ChatMessage';
import { MessageType } from '../ChatControls/ChatControls';
import useGameLog from './useGameLog';

import styles from '../Chat.module.css';

interface Props {
  enabledTypes: MessageType[];
}

const ChatMessages = ({ enabledTypes }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { availableUndoIds, gameState, player: self } = useContext(GameStateContext);
  const isHost = gameState!.hostId === self!.id;

  const { log } = useGameLog(enabledTypes);
  const { undo } = useGameActions();

  const virtualizer = useVirtualizer({
    count: log.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  const scrollToBottom = () => {
    parentRef.current?.scrollTo(0, parentRef.current.scrollHeight);
  };

  useEffect(scrollToBottom, [enabledTypes.length]);

  const lastMessageTimestamp = log?.at(-1)?.timestamp;

  useEffect(() => {
    if (!parentRef.current) return;

    const currentScroll = parentRef.current.scrollTop;
    const { scrollHeight } = parentRef.current;
    const diff = scrollHeight - currentScroll;

    // auto scroll, but only if the user is already close to the bottom
    if (diff < 2000) {
      scrollToBottom();
    }
  }, [lastMessageTimestamp]);

  const canUndo = (message: GameLog) => {
    if (!isHost) return false;
    if (!message.undoId) return false;
    return availableUndoIds.includes(message.undoId);
  };

  const onUndo = (undoId: string) => {
    const confirmMessage = `Are you sure you want to move back to this game state?`;
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;
    undo(undoId);
  };

  return (
    <div ref={parentRef} className={styles.messages}>
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${items[0]?.start ?? 0}px)`,
          }}
        >
          {items.map((virtualRow) => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              className={styles.message_wrapper}
              ref={virtualizer.measureElement}
            >
              {canUndo(log[virtualRow.index]) && (
                <ReloadOutlined
                  onClick={() => onUndo(log[virtualRow.index].undoId!)}
                  className={styles.undoButton}
                />
              )}
              <ChatMessage message={log[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
