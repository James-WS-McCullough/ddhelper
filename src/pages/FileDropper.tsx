import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, HStack } from '@chakra-ui/react';

const AudioPlayer = ({ fileObject }) => {
  const src = fileObject.src;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const audioInstance = new Audio(src);
    setAudio(audioInstance);

    // Clean up the audio instance when the component is unmounted
    return () => {
      audioInstance.pause();
      setAudio(null);
    };
  }, [src]);

  const handlePlay = () => {
    setIsPlaying(true);
    audio.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    if (audio) {
      audio.volume = value / 100;
    }
  };

  return (
    <HStack w="400px">
      <VStack w="75%" alignItems="start">
        <Text noOfLines={1} w="full" textAlign="left" color="white">{fileObject.file.name}</Text>
        <Slider
          aria-label="volume slider"
          defaultValue={volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </VStack>
      <VStack w="25%" spacing={4}> {/* Remaining space for the button. Adjust width if needed */}
      </VStack>
      {isPlaying ? (
        <Button onClick={handlePause}>Pause</Button>
      ) : (
        <Button onClick={handlePlay}>Play</Button>
      )}
    </HStack>
  );
};

const FileDropper = () => {
  const [droppedFiles, setDroppedFiles] = useState([]);

  console.log('droppedFiles', droppedFiles)

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files].filter(file =>
      file.type.startsWith('audio/')
    );
  
    files.forEach((file) => {
      const reader = new FileReader();
  
      const loop = file.name.includes('loop');
      reader.onloadend = () => {
        setDroppedFiles(prevState => [
          ...prevState,
          {
            file, 
            src: reader.result,
            loop
          }
        ].sort((a, b) => {
          if (a.loop && !b.loop) return -1;
          if (!a.loop && b.loop) return 1;
          if (a.file.name < b.file.name) return -1;
          if (a.file.name > b.file.name) return 1;
          return 0;
        }));
      };
      reader.readAsDataURL(file);
    });
  };
  
  const listDroppedFiles = () => {
    return droppedFiles.map((fileObject) => (
      <VStack 
        bg={fileObject.loop ? 'blue.700' : 'gray.700'}
        key={`${fileObject.file.name}-${fileObject.file.lastModified}`} // more stable key
        p={5} 
        shadow="lg" 
        rounded="lg" 
        border="1px solid" 
        borderColor="gray.500"
      >
        <AudioPlayer fileObject={fileObject} />
      </VStack>
    ));
  };

  if (droppedFiles.length === 0) return (
    <VStack
      spacing={5}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      borderWidth={2}
      borderRadius="md"
      p={4}
      w="100%"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >

      <Text fontSize="xl" >Drop your audio files here:</Text>
    </VStack>
  )


  return (
    <VStack
      spacing={5}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      borderWidth={2}
      borderRadius="md"
      p={4}
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >

      {listDroppedFiles()}
    </VStack>
  );
};

export default FileDropper;
