import React, { useState, useEffect } from 'react';
import { Image, Box, SimpleGrid } from '@chakra-ui/react';
import ScoreDisplay from './ScoreDisplay';

const Popup = () => {
  const [src, setSrc] = useState(null);
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
      <Image src={src} objectFit="contain" maxH="90%" maxW="90%" />
      <Box 
    position={'absolute'} 
    display="flex"
    flexWrap="wrap"
    justifyContent={receivedScores.length === 1 ? "center" : "flex-start"}
    width="100%"
>
  {
    receivedScores.map(score => (
      <Box 
          key={score.name}
          width={receivedScores.length === 1 ? "auto" : "50%"}
          p={2} // this acts as spacing between the items
      >
        <ScoreDisplay 
          name={score.name} 
          successes={score.successes} 
          failures={score.failures} 
        />
      </Box>
    ))
  }
</Box>

    </Box>
  );
};

export default Popup;
