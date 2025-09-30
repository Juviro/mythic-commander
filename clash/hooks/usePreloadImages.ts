import { useEffect } from 'react';

const usePreloadImages = (urls: string[]) => {

  useEffect(() => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [urls.join(',')]);
};

export default usePreloadImages;