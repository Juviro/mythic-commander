import { useEffect } from 'react';

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    if (typeof title !== 'string') return;
    document.title = `${title} - Mythic Commander`;
  }, [title]);
};

export default useDocumentTitle;
