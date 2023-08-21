import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS = {
  threshold: 0.5,
};

export const useAnimateOnAppearance = (
  ref: { current: HTMLElement | null },
  options?: IntersectionObserverInit
) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || !IntersectionObserver) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);

          if (!ref.current) return;
          observer.unobserve(ref.current);
        }
      },
      { ...DEFAULT_OPTIONS, ...options }
    );

    observer.observe(ref.current);

    return () => {
      if (!ref.current) return;
      observer.unobserve(ref.current);
    };
  }, []);

  return visible;
};
