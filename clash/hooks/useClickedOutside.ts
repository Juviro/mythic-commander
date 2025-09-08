import React, { useEffect } from 'react';

interface Options {
  disabled?: boolean;
}

const useClickedOutside = (
  ref: React.RefObject<Element | null>,
  callback: () => void,
  { disabled }: Options = {}
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event || !ref.current || !callback || disabled) return;
      if (ref.current.contains(event.target)) return;
      callback();
    };
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [ref.current, disabled]);
};

export default useClickedOutside;
