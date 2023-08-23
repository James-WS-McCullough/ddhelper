import React, { useState, useEffect } from 'react';
import { Image, Box } from '@chakra-ui/react';
import ScoreDisplay from './ScoreDisplay';

const Popup = () => {
  const initialSrc = localStorage.getItem('selectedImageSrc');
  const [src, setSrc] = useState(initialSrc);
  const [receivedScores, setReceivedScores] = useState([]);

useEffect(() => {
    const handleMessage = (event) => {
        if (event.data.type === "DATA_UPDATE") {
            setReceivedScores(event.data.data.scores);
            setSrc(event.data.data.src);
        }
        if (event.data.type === "imageUpdate") {
          setSrc(event.data.data.src);
        }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
}, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw" backgroundColor="black">
      <Image src={src} alt="Selected" objectFit="contain" maxH="90%" maxW="90%" />
      {
        receivedScores.map(score => (
          <ScoreDisplay 
            key={score.name}
            name={score.name} 
            successes={score.successes} 
            failures={score.failures} 
          />
        ))
      }
    </Box>
  );
};

export default Popup;
