import React, { useState, useEffect } from 'react';
import { Image, Box } from '@chakra-ui/react';

const Popup = () => {
  const initialSrc = localStorage.getItem('selectedImageSrc');
  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    const handleMessage = (event) => {
      // TODO: in a real application, verify the origin for security reasons!
      if (event.data.src) {
        setSrc(event.data.src);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw" backgroundColor="black">
      <Image src={src} alt="Selected" objectFit="contain" maxH="90%" maxW="90%" />
    </Box>
  );
};

export default Popup;
