import { useEffect, useRef } from 'react';

const getScreenLock = async () => {
  if (!('wakeLock' in navigator)) return null;

  let screenLock: WakeLockSentinel;
  try {
    screenLock = await navigator.wakeLock.request('screen');
  } catch (err) {
    console.error(err.name, err.message);
  }
  return screenLock;
};

const usePreventScreenLock = () => {
  const screenLock = useRef(null);

  useEffect(() => {
    getScreenLock().then((lock) => {
      screenLock.current = lock;
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        getScreenLock().then((lock) => {
          screenLock.current = lock;
        });
      } else {
        if (!screenLock.current) return;
        screenLock.current.release();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (!screenLock.current) return;

      screenLock.current.release();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};

export default usePreventScreenLock;
