import React, { useState, useEffect } from 'react';
import { Image, Box, SimpleGrid } from '@chakra-ui/react';
import ScoreDisplay from './ScoreDisplay';

const Popup = () => {
  const [locationSrc, setLocationSrc] = useState(null);
  const [portraitsSrcs, setPortraitsSrcs] = useState([]);
  const [receivedScores, setReceivedScores] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
        if (event.data.type === "DATA_UPDATE") {
            setReceivedScores(event.data.data.scores);
            setLocationSrc(event.data.data.locationSrc);
            setPortraitsSrcs(event.data.data.portraitsSrcs);
        }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
}, []);

  return (
    <Box 
    w="100vw" 
    h="100vh" 
    bg={locationSrc ? `url(${locationSrc}) center/cover no-repeat` : 'black'}
    position="relative" 
    display="flex"
    alignItems="center"
    justifyContent="center"
>
<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4} width="100%">
                {portraitsSrcs.map((src, index) => (
                    <Box key={index}>
                        <img src={src} alt={`Portrait ${index}`} style={{ width: '100%', height: 'auto' }} />
                    </Box>
                ))}
            </SimpleGrid>
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
