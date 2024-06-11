import React, { useState, useEffect, useRef } from "react";
import {
  HStack,
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  Button,
} from "@chakra-ui/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { parseFilename } from "../generics/parseFilename";

interface FileObject {
  file: File;
  src: string;
  loop: boolean;
}

interface AudioPlayerProps {
  fileObject: FileObject;
}

const AudioPlayer = React.forwardRef(
  ({ fileObject }: AudioPlayerProps, ref) => {
    const src = fileObject.src;
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [audio, setAudio] = useState(null);
    const FADE_DURATION = 2000;
    const STEPS = 40;
    const stepDuration = FADE_DURATION / STEPS;
    const [decrementStep, setDecrementStep] = useState(volume / 100 / STEPS);

    useEffect(() => {
      const audioInstance = new Audio(src);
      setAudio(audioInstance);

      const handleLoop = () => {
        if (fileObject.loop) {
          audioInstance.currentTime = 0;
          playAudio(); // Call the play function here
        } else {
          setIsPlaying(false);
        }
      };

      audioInstance.addEventListener("ended", handleLoop);

      return () => {
        audioInstance.pause(); // Ensure audio is paused when the component is unmounted
        audioInstance.removeEventListener("ended", handleLoop);
      };
    }, [src, fileObject.loop]);

    const playAudio = () => {
      if (!audio) return; // Guard clause

      audio.volume = volume / 100; // Ensure we reset the volume when playing again
      audio.play();
      setIsPlaying(true);
    };

    const handleToggle = () => {
      if (!audio) return; // Guard clause

      if (isPlaying) {
        if (fileObject.loop) {
          fadeOut();
        } else {
          audio.pause();
          audio.currentTime = 0;
          setIsPlaying(false);
        }
      } else {
        playAudio();
      }
    };

    useEffect(() => {
      const audioInstance = new Audio(src);
      setAudio(audioInstance);

      audioInstance.onended = () => {
        if (!fileObject.loop) {
          setIsPlaying(false);
        }
      };

      if (fileObject.loop) {
        audioInstance.addEventListener("ended", () => {
          audioInstance.currentTime = 0;
          audioInstance.play();
        });
        return () => {
          audioInstance.pause(); // Ensure audio is paused when the component is unmounted
          audioInstance.removeEventListener("ended", audioInstance.onended);
        };
      }
    }, [src, fileObject.loop]);

    const fadeOut = () => {
      if (!audio) return; // Guard clause

      if (audio.volume > decrementStep) {
        audio.volume -= decrementStep;
        setTimeout(fadeOut, stepDuration);
      } else {
        audio.volume = 0;
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        setIsPlaying(false);
      }
    };

    const handleVolumeChange = (value) => {
      setVolume(value);
      if (audio) {
        audio.volume = value / 100;
        setDecrementStep(audio.volume / STEPS); // Update decrement step when volume changes
      }
    };

    React.useImperativeHandle(ref, () => ({
      fadeOut,
    }));

    return (
      <HStack
        w="400px"
        bg={isPlaying ? "blue.300" : fileObject.loop ? "blue.700" : "gray.700"}
        p={5}
        shadow="lg"
        rounded="lg"
        border="1px solid"
        borderColor="gray.500"
        spacing={8}
      >
        <VStack w="100%" alignItems="start">
          <Text noOfLines={1} w="full" textAlign="left" color="white">
            {parseFilename(fileObject.file.name)}
          </Text>
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
        {isPlaying ? (
          <IconButton
            colorScheme="red"
            onClick={handleToggle}
            aria-label="stop"
            icon={<StopIcon />}
          />
        ) : (
          <IconButton
            colorScheme="green"
            onClick={handleToggle}
            aria-label="play"
            icon={<PlayArrowIcon />}
          />
        )}
      </HStack>
    );
  }
);

const AudioFileDropper = () => {
  const [droppedFiles, setDroppedFiles] = useState([]);
  const audioPlayersRef = useRef([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files].filter((file) =>
      file.type.startsWith("audio/")
    );

    files.forEach((file) => {
      const reader = new FileReader();

      const loop = file.name.includes("loop");
      reader.onloadend = () => {
        setDroppedFiles((prevState) =>
          [
            ...prevState,
            {
              file,
              src: reader.result,
              loop,
            },
          ].sort((a, b) => {
            if (a.loop && !b.loop) return -1;
            if (!a.loop && b.loop) return 1;
            if (a.file.name < b.file.name) return -1;
            if (a.file.name > b.file.name) return 1;
            return 0;
          })
        );
      };
      reader.readAsDataURL(file);
    });
  };

  const listDroppedFiles = () => {
    return droppedFiles.map((fileObject, index) => {
      return (
        <VStack
          key={`${fileObject.file.name}-${fileObject.file.lastModified}`} // more stable key
        >
          <AudioPlayer
            fileObject={fileObject}
            ref={(el) => (audioPlayersRef.current[index] = el)}
          />
        </VStack>
      );
    });
  };

  const fadeAll = () => {
    audioPlayersRef.current.forEach((player) => {
      if (player) {
        player.fadeOut();
      }
    });
  };

  if (droppedFiles.length === 0)
    return (
      <VStack
        spacing={5}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
      >
        <Text fontSize="xl">Drop your audio files here!</Text>
      </VStack>
    );

  return (
    <VStack
      spacing={5}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >
      <VStack>
        <Text fontSize="xl">General</Text>
        <HStack>
          <Button ml={4} onClick={fadeAll} colorScheme="red">
            Fade All
          </Button>
        </HStack>
      </VStack>
      {listDroppedFiles()}
    </VStack>
  );
};

export default AudioFileDropper;
