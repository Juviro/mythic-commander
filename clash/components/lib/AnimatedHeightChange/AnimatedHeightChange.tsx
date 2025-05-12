import React, { PropsWithChildren, useRef, useEffect, useState } from 'react';

import styles from './AnimatedHeightChange.module.css';

interface AnimatedHeightChangeProps extends PropsWithChildren {
  isActive: boolean;
}

const AnimatedHeightChange = ({ isActive, children }: AnimatedHeightChangeProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(isActive ? 'auto' : 0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isActive) {
      setHeight(el.scrollHeight);
      return;
    }

    // Closing: set to pixel height, then to 0 in next animation frame
    setHeight(0);
  }, [isActive, children]);

  return (
    <div className={styles.animatedHeightChange} style={{ height }} ref={contentRef}>
      {children}
    </div>
  );
};

export default AnimatedHeightChange;
