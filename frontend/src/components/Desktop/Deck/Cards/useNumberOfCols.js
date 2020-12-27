import { useEffect, useRef, useState } from 'react';

export const MIN_COLUMN_WIDTH = 300;
export const MAX_COLUMNS = 4;

export default (wrapperRef) => {
  const [numberOfCols, setNumberOfCols] = useState(null);

  const observer = useRef(
    new ResizeObserver((entries) => {
      // Only care about the first element, we expect one element to be watched
      const { width } = entries[0].contentRect;
      const usedWidth = width - 32;
      const newNumberOfCols = Math.max(
        // add margin
        Math.min(Math.floor(usedWidth / (MIN_COLUMN_WIDTH + 8)), MAX_COLUMNS),
        1
      );

      if (newNumberOfCols === numberOfCols) return;
      setNumberOfCols(newNumberOfCols);
    })
  );

  useEffect(() => {
    if (wrapperRef.current) {
      observer.current.observe(wrapperRef.current);
    }
  });

  return { numberOfCols };
};
