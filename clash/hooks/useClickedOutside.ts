import React, { useEffect } from 'react';

interface Options {
  disabled?: boolean;
}

const useClickedOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
  { disabled }: Options = {}
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event || !ref.current || !callback || disabled) return;
      if (ref.current.contains(event.target)) return;
      callback();
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref.current, disabled]);
};

export default useClickedOutside;
