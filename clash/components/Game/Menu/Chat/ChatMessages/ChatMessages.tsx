import React, { useContext, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import GameStateContext from 'components/Game/GameStateContext';

import styles from '../Chat.module.css';
import ChatMessage from './ChatMessage';
import { MessageType } from '../ChatControls/ChatControls';

interface Props {
  enabledTypes: MessageType[];
}

const ChatMessages = ({ enabledTypes }: Props) => {
  const { gameState } = useContext(GameStateContext);
  const { gameLog } = gameState!;
  const parentRef = useRef<HTMLDivElement>(null);

  const displayedLog = gameLog.filter(({ logKey }) => {
    if (!enabledTypes.length) return true;
    if (logKey === 'CHAT_MESSAGE') return enabledTypes.includes('CHAT');
    return enabledTypes.includes('LOG');
  });

  const virtualizer = useVirtualizer({
    count: displayedLog.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  const scrollToBottom = () => {
    parentRef.current?.scrollTo(0, parentRef.current.scrollHeight);
  };

  useEffect(scrollToBottom, [enabledTypes.length]);

  useEffect(() => {
    if (!parentRef.current) return;

    const currentScroll = parentRef.current.scrollTop;
    const { scrollHeight } = parentRef.current;
    const diff = scrollHeight - currentScroll;

    // auto scroll, but only if the user is already close to the bottom
    if (diff < 600) {
      scrollToBottom();
    }
  }, [displayedLog.length]);

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
              <ChatMessage message={displayedLog[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
