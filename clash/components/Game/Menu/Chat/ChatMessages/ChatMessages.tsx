import React, { useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import styles from '../Chat.module.css';
import ChatMessage from './ChatMessage';
import { MessageType } from '../ChatControls/ChatControls';
import useGameLog from './useGameLog';

interface Props {
  enabledTypes: MessageType[];
}

const ChatMessages = ({ enabledTypes }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { log } = useGameLog(enabledTypes);

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
              <ChatMessage message={log[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
