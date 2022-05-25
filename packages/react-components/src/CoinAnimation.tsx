import { Box } from '@mui/material';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';

import coins from './coins.json';

const CoinAnimation: React.FC<{ size?: number | string }> = ({ size = '100px' }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const animate = lottie.loadAnimation({
      container: elementRef.current, // the dom element that will contain the animation
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      animationData: coins // the path to the animation json
    });

    animate.addEventListener('complete', () => {
      if (!elementRef.current) {
        return;
      }

      animate.destroy();
    });
  }, []);

  return <Box ref={elementRef} sx={{ width: size, height: size }} />;
};

export default React.memo(CoinAnimation);
