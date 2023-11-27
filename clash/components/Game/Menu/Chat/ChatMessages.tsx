import React, { useContext, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import GameStateContext from 'components/Game/GameStateContext';

import styles from './Chat.module.css';
import ChatMessage from './ChatMessage/ChatMessage';

const ChatMessages = () => {
  const { gameState } = useContext(GameStateContext);
  const { gameLog } = gameState!;
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: gameLog.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    setTimeout(() => {
      parentRef.current?.scrollTo(0, parentRef.current.scrollHeight);
    }, 100);
  }, []);

  useEffect(() => {
    if (!parentRef.current) return;

    const currentScroll = parentRef.current.scrollTop;
    const { scrollHeight } = parentRef.current;
    const diff = scrollHeight - currentScroll;

    // auto scroll, but only if the user is already close to the bottom
    if (diff < 600) {
      parentRef.current.scrollTo(0, parentRef.current.scrollHeight);
    }
  }, [gameLog.length]);

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
              ref={virtualizer.measureElement}
            >
              <ChatMessage message={gameLog[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
