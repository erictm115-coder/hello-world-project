import { useEffect, useState } from 'react';

export const useImagePreloader = (imageUrls: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even on error to not block the UI
          img.src = url;
        });
      });

      await Promise.all(promises);

      if (isMounted) {
        setImagesLoaded(true);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return imagesLoaded;
};
