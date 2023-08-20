import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  hash: string;
  onClose: () => void;
}

const useCloseWithBackButton = ({ isOpen, hash, onClose }: Props) => {
  useEffect(() => {
    if (!isOpen) {
      window.history.replaceState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    } else {
      window.location.hash = `#${hash}`;
    }
  }, [isOpen]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) return;
      onClose();
    };

    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
};

export default useCloseWithBackButton;
