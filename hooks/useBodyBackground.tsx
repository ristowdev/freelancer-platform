// hooks/useBodyBackground.ts
import { useEffect } from 'react';

const useBodyBackground = (color: string) => {
  useEffect(() => {
    const originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = color;

    // Cleanup function to reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
    };
  }, [color]);
};

export default useBodyBackground;