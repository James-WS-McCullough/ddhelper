import React, { useState, useRef } from "react";
import {
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Image,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Divider,
  Heading,
  useToast,
  Spacer,
  Center,
  CloseButton,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoIcon from "@mui/icons-material/Photo";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PauseIcon from "@mui/icons-material/Pause";
import LoopIcon from "@mui/icons-material/Loop";
import LandscapeIcon from "@mui/icons-material/Landscape";
import PeopleIcon from "@mui/icons-material/People";
import MovieIcon from "@mui/icons-material/Movie";
import { parseFilename } from "../../generics/parseFilename";

// Type definitions
interface AudioFile {
  file: File;
  src: string;
  loop: boolean;
  music: boolean;
  isPlaying?: boolean;
  volume?: number;
}

interface ImageFile {
  file: File;
  src: string;
}

interface VideoFile {
  file: File;
  src: string;
  thumbnail: string;
  isBackground: boolean;
}

// Track the state of audio fades
interface AudioFadeState {
  [key: string]: "fading-in" | "fading-out" | "none";
}

// Track both background and event videos separately
interface VideoState {
  background: VideoFile | null;
  event: VideoFile | null;
}

interface FileManagerProps {
  // Audio props
  droppedAudioFiles: AudioFile[];
  setDroppedAudioFiles: React.Dispatch<React.SetStateAction<AudioFile[]>>;

  // Image props
  droppedImages: ImageFile[];
  setDroppedImages: React.Dispatch<React.SetStateAction<ImageFile[]>>;
  selectedLocation: string | null;
  setSelectedLocation: (filename: string | null) => void;
  selectedPortraits: string[];
  setSelectedPortraits: React.Dispatch<React.SetStateAction<string[]>>;
  showNames: boolean;
  setShowNames: React.Dispatch<React.SetStateAction<boolean>>;

  // Video props
  droppedVideos: VideoFile[];
  setDroppedVideos: React.Dispatch<React.SetStateAction<VideoFile[]>>;
  playVideo: (filename: string) => void;
  clearVideo: () => void;
  currentlyPlayingVideo: VideoState;

  // Overall display controls
  blackOverlay: boolean;
  setBlackOverlay: React.Dispatch<React.SetStateAction<boolean>>;
}

// File thumbnail component for images and videos
const FileThumbnail = ({
  fileObject,
  isSelected,
  onClick,
  type,
}: {
  fileObject: ImageFile | VideoFile;
  isSelected: boolean;
  onClick: () => void;
  type: "image" | "video";
}) => (
  <VStack
    p={3}
    border={isSelected ? "2px solid white" : "1px solid gray"}
    bg={isSelected ? "blue.700" : "gray.800"}
    onClick={onClick}
    cursor="pointer"
    borderRadius="md"
    width="100%"
    height="160px"
    justify="space-between"
    align="center"
    _hover={{ bg: "blue.800" }}
    transition="all 0.2s"
    position="relative"
  >
    <Text fontSize="sm" noOfLines={2} textAlign="center" color="white">
      {parseFilename(fileObject.file.name)}
    </Text>
    <Image
      src={
        type === "video" ? (fileObject as VideoFile).thumbnail : fileObject.src
      }
      alt={fileObject.file.name}
      boxSize="100px"
      objectFit="cover"
      borderRadius="md"
    />
    {type === "video" && (
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="blackAlpha.700"
        borderRadius="full"
        p={2}
      >
        <PlayArrowIcon style={{ color: "white" }} />
      </Box>
    )}
  </VStack>
);

// Sidebar Item Component
const SidebarItem = ({
  title,
  children,
  onClose,
  icon,
}: {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
  icon: React.ReactNode;
}) => (
  <Box
    p={2}
    mb={2}
    bg="gray.700"
    borderRadius="md"
    borderWidth="1px"
    borderColor="gray.600"
    width="100%"
  >
    <HStack mb={1} justify="space-between">
      <HStack>
        {icon}
        <Text fontWeight="semibold" fontSize="sm">
          {title}
        </Text>
      </HStack>
      <CloseButton size="sm" onClick={onClose} />
    </HStack>
    {children}
  </Box>
);

// Audio Controls Component for Sidebar
const AudioControls = ({
  audio,
  volume,
  setVolume,
  isPlaying,
  togglePlay,
  isFading,
  fadeState,
}: {
  audio: AudioFile;
  volume: number;
  setVolume: (value: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
  isFading: boolean;
  fadeState: "fading-in" | "fading-out" | "none";
}) => (
  <VStack w="100%" spacing={1}>
    <HStack w="100%" justify="space-between">
      <Slider
        aria-label="volume slider"
        value={volume}
        min={0}
        max={100}
        onChange={setVolume}
        w="80%"
        isDisabled={isFading}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <IconButton
        size="xs"
        colorScheme={isFading ? "gray" : isPlaying ? "yellow" : "green"}
        onClick={togglePlay}
        aria-label={isPlaying ? "pause" : "play"}
        icon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        isDisabled={isFading}
      />
    </HStack>
    {isFading && (
      <Badge colorScheme="yellow" size="sm" alignSelf="flex-end">
        {fadeState === "fading-in" ? "Fading In" : "Fading Out"}
      </Badge>
    )}
  </VStack>
);

const FileManager: React.FC<FileManagerProps> = ({
  droppedAudioFiles,
  setDroppedAudioFiles,
  droppedImages,
  setDroppedImages,
  selectedLocation,
  setSelectedLocation,
  selectedPortraits,
  setSelectedPortraits,
  showNames,
  setShowNames,
  droppedVideos,
  setDroppedVideos,
  playVideo,
  clearVideo,
  currentlyPlayingVideo,
  blackOverlay,
  setBlackOverlay,
}) => {
  const toast = useToast();
  const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [activeAudio, setActiveAudio] = useState<{
    [key: string]: { audio: AudioFile; volume: number; isPlaying: boolean };
  }>({});
  const [audioFadeState, setAudioFadeState] = useState<AudioFadeState>({});

  // Set fade duration to 5 seconds
  const FADE_DURATION = 5000; // 5 seconds
  const FADE_STEPS = 100; // More steps for smoother transition
  const stepDuration = FADE_DURATION / FADE_STEPS;
  const volumeStep = 1 / FADE_STEPS;

  // Filter files by type
  const locationImages = droppedImages
    .filter((img) => img.file.name.includes("location"))
    .sort((a, b) =>
      parseFilename(a.file.name).localeCompare(parseFilename(b.file.name))
    );

  const portraitImages = droppedImages
    .filter((img) => !img.file.name.includes("location"))
    .sort((a, b) =>
      parseFilename(a.file.name).localeCompare(parseFilename(b.file.name))
    );

  const backgroundVideos = droppedVideos
    .filter((video) => video.isBackground)
    .sort((a, b) =>
      parseFilename(a.file.name).localeCompare(parseFilename(b.file.name))
    );

  const eventVideos = droppedVideos
    .filter((video) => !video.isBackground)
    .sort((a, b) =>
      parseFilename(a.file.name).localeCompare(parseFilename(b.file.name))
    );

  const loopingSoundEffects = droppedAudioFiles
    .filter((audio) => audio.loop && !audio.music)
    .sort((a, b) =>
      parseFilename(a.file.name).localeCompare(parseFilename(b.file.name))
    );

  const loopingMusic = droppedAudioFiles
    .filter((audio) => audio.music)
    .sort((a, b) =>
      parseFilename(a.file.name).localeCompare(parseFilename(b.file.name))
    );

  const soundEffects = droppedAudioFiles
    .filter((audio) => !audio.loop && !audio.music)
    .sort((a, b) =>
      parseFilename(a.file.name).localeCompare(parseFilename(b.file.name))
    );

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    // Process audio files
    const audioFiles = files.filter((file) => file.type.startsWith("audio/"));
    audioFiles.forEach((file) => {
      const reader = new FileReader();
      const hasLoopTag = file.name.includes("_loop");
      const hasMusicTag = file.name.includes("_music");
      const shouldLoop = hasLoopTag || hasMusicTag;

      reader.onloadend = () => {
        setDroppedAudioFiles((prev) =>
          [
            ...prev,
            {
              file,
              src: reader.result as string,
              loop: shouldLoop,
              music: hasMusicTag,
            },
          ].sort((a, b) => {
            if (a.music && !b.music) return -1;
            if (!a.music && b.music) return 1;
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

    // Process image and video files
    const mediaFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );

    if (mediaFiles.length > 0) {
      mediaFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (file.type.startsWith("image/")) {
            setDroppedImages((prev) => [
              ...prev,
              { file, src: reader.result as string },
            ]);
          } else if (file.type.startsWith("video/")) {
            const video = document.createElement("video");
            const videoUrl = URL.createObjectURL(file);
            video.src = videoUrl;
            video.currentTime = 1;
            video.addEventListener("loadeddata", () => {
              const canvas = document.createElement("canvas");
              canvas.width = 150;
              canvas.height = 100;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnail = canvas.toDataURL();
                setDroppedVideos((prev) => [
                  ...prev,
                  {
                    file,
                    src: videoUrl,
                    thumbnail,
                    isBackground: file.name.includes("location"),
                  },
                ]);
              }
            });
          }
        };
        reader.readAsDataURL(file);
      });
    } else if (files.length > 0 && !audioFiles.length) {
      toast({
        title: "No valid files found",
        description: "Please drop valid audio, image, or video files.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle image selection
  const handleImageClick = (index: number, isLocation: boolean) => {
    if (isLocation) {
      // Use filename as unique identifier
      const filename = locationImages[index].file.name;
      setSelectedLocation(selectedLocation === filename ? null : filename);
      return;
    }

    // Use filename as unique identifier for portraits
    const filename = portraitImages[index].file.name;

    if (selectedPortraits.includes(filename)) {
      setSelectedPortraits(
        selectedPortraits.filter((name) => name !== filename)
      );
    } else {
      setSelectedPortraits([...selectedPortraits, filename]);
    }
  };

  const isImageSelected = (index: number, isLocation: boolean) => {
    if (isLocation) {
      // Compare by filename
      return locationImages[index].file.name === selectedLocation;
    }
    // Compare by filename
    return selectedPortraits.includes(portraitImages[index].file.name);
  };

  // Audio player controls
  const playAudio = (audio: AudioFile) => {
    const audioKey = audio.file.name;

    // If this audio is already active, don't play it again
    if (audioElementsRef.current[audioKey]) {
      return;
    }

    // Stop any currently playing music if this is a music track
    if (audio.music) {
      Object.entries(activeAudio).forEach(([key, data]) => {
        if (data.audio.music) {
          stopAudio(key);
        }
      });
    }

    const audioElement = new Audio(audio.src);
    audioElement.loop = audio.loop;

    // For non-looping sound effects, play immediately without fading
    const shouldFade = audio.loop || audio.music;

    if (shouldFade) {
      audioElement.volume = 0; // Start at 0 volume for fade-in
    } else {
      audioElement.volume = 0.5; // Start at full volume for sound effects
    }

    audioElement.play();
    audioElementsRef.current[audioKey] = audioElement;

    // Set different default volumes based on audio type
    const defaultVolume = audio.music ? 20 : 50; // 20% for music, 50% for other sounds

    // Set initial state
    setActiveAudio((prev) => ({
      ...prev,
      [audioKey]: {
        audio,
        volume: defaultVolume,
        isPlaying: true,
      },
    }));

    if (shouldFade) {
      // Set fade state to fading-in only for looping or music tracks
      setAudioFadeState((prev) => ({
        ...prev,
        [audioKey]: "fading-in",
      }));

      // Fade in gradually
      let currentStep = 0;
      // Use different target volumes based on audio type
      const targetVolume = audio.music ? 0.2 : 0.5; // 20% for music, 50% for other sounds

      const fadeIn = () => {
        currentStep++;
        if (currentStep <= FADE_STEPS) {
          // Calculate current volume based on step
          const newVolume = (targetVolume / FADE_STEPS) * currentStep;
          audioElement.volume = newVolume;
          setTimeout(fadeIn, stepDuration);
        } else {
          // Fade complete
          audioElement.volume = targetVolume;
          setAudioFadeState((prev) => ({
            ...prev,
            [audioKey]: "none",
          }));
        }
      };

      fadeIn();
    } else {
      // For non-looping sound effects, set fade state to none
      setAudioFadeState((prev) => ({
        ...prev,
        [audioKey]: "none",
      }));
    }

    // If it's not a looping sound, set up onended to remove it
    if (!audio.loop) {
      audioElement.onended = () => {
        // For one-time sound effects, don't remove them from active audio,
        // just update their state to not playing so they can be replayed
        const audioKey = audio.file.name;

        // Set it to not playing instead of removing it
        setActiveAudio((prev) => ({
          ...prev,
          [audioKey]: {
            ...prev[audioKey],
            isPlaying: false,
          },
        }));

        // Reset the audio element for future playback
        audioElement.currentTime = 0;

        // Remove from fade state
        setAudioFadeState((prev) => ({
          ...prev,
          [audioKey]: "none",
        }));
      };
    }
  };

  const stopAudio = (audioKey: string, shouldFade = true) => {
    if (audioElementsRef.current[audioKey]) {
      const audioElement = audioElementsRef.current[audioKey];
      const audioData = activeAudio[audioKey];

      // For non-looping sound effects, stop immediately unless explicitly told to fade
      const isOneTimeEffect = !audioData.audio.loop && !audioData.audio.music;

      if (isOneTimeEffect && !shouldFade) {
        // Stop immediately without fading
        audioElement.pause();
        audioElement.currentTime = 0;
        delete audioElementsRef.current[audioKey];

        setActiveAudio((prev) => {
          const newState = { ...prev };
          delete newState[audioKey];
          return newState;
        });

        setAudioFadeState((prev) => {
          const newState = { ...prev };
          delete newState[audioKey];
          return newState;
        });

        return;
      }

      // If already fading, don't start another fade
      if (audioFadeState[audioKey] === "fading-out") {
        return;
      }

      // Mark as fading out
      setAudioFadeState((prev) => ({
        ...prev,
        [audioKey]: "fading-out",
      }));

      // Fade out audio
      let currentStep = 0;
      const startVolume = audioElement.volume;
      const fadeSteps = Math.floor(startVolume * FADE_STEPS); // Adjust steps based on current volume

      const fadeOut = () => {
        currentStep++;
        if (currentStep <= fadeSteps && fadeSteps > 0) {
          // Calculate current volume based on step
          const newVolume =
            startVolume - (startVolume / fadeSteps) * currentStep;
          audioElement.volume = Math.max(0, newVolume);
          setTimeout(fadeOut, stepDuration);
        } else {
          // Fade complete, remove from active audio
          audioElement.pause();
          audioElement.currentTime = 0;
          delete audioElementsRef.current[audioKey];

          setActiveAudio((prev) => {
            const newState = { ...prev };
            delete newState[audioKey];
            return newState;
          });

          setAudioFadeState((prev) => {
            const newState = { ...prev };
            delete newState[audioKey];
            return newState;
          });
        }
      };

      fadeOut();
    }
  };

  const setAudioVolume = (audioKey: string, value: number) => {
    // Don't allow volume changes during fade transitions
    if (
      audioFadeState[audioKey] === "fading-in" ||
      audioFadeState[audioKey] === "fading-out"
    ) {
      return;
    }

    if (audioElementsRef.current[audioKey]) {
      audioElementsRef.current[audioKey].volume = value / 100;

      setActiveAudio((prev) => ({
        ...prev,
        [audioKey]: {
          ...prev[audioKey],
          volume: value,
        },
      }));
    }
  };

  const toggleAudioPlayback = (audioKey: string) => {
    // Don't allow toggling during fade transitions
    if (
      audioFadeState[audioKey] === "fading-in" ||
      audioFadeState[audioKey] === "fading-out"
    ) {
      return;
    }

    const audioElement = audioElementsRef.current[audioKey];
    const audioData = activeAudio[audioKey];
    const isOneTimeEffect = !audioData.audio.loop && !audioData.audio.music;

    if (audioElement) {
      if (audioData.isPlaying) {
        if (isOneTimeEffect) {
          // For non-looping sound effects, pause immediately without fading
          audioElement.pause();

          setActiveAudio((prev) => ({
            ...prev,
            [audioKey]: {
              ...prev[audioKey],
              isPlaying: false,
            },
          }));
        } else {
          // Fade out looping or music audio when pausing
          setAudioFadeState((prev) => ({
            ...prev,
            [audioKey]: "fading-out",
          }));

          let currentStep = 0;
          const startVolume = audioElement.volume;
          const fadeSteps = Math.floor(startVolume * FADE_STEPS);

          const fadeOut = () => {
            currentStep++;
            if (currentStep <= fadeSteps && fadeSteps > 0) {
              const newVolume =
                startVolume - (startVolume / fadeSteps) * currentStep;
              audioElement.volume = Math.max(0, newVolume);
              setTimeout(fadeOut, stepDuration);
            } else {
              // Just pause the audio instead of removing it
              audioElement.pause();

              setActiveAudio((prev) => ({
                ...prev,
                [audioKey]: {
                  ...prev[audioKey],
                  isPlaying: false,
                  // Store original volume for when we resume
                  volume: prev[audioKey].volume,
                },
              }));

              setAudioFadeState((prev) => ({
                ...prev,
                [audioKey]: "none",
              }));
            }
          };

          fadeOut();
        }
      } else {
        if (isOneTimeEffect) {
          // For non-looping sound effects, play immediately without fading
          audioElement.currentTime = 0; // Reset to beginning
          audioElement.volume = audioData.volume / 100 || 0.5; // Use stored volume or default
          audioElement.play();

          setActiveAudio((prev) => ({
            ...prev,
            [audioKey]: {
              ...prev[audioKey],
              isPlaying: true,
            },
          }));
        } else {
          // When resuming from pause for looping or music, fade in gradually
          setAudioFadeState((prev) => ({
            ...prev,
            [audioKey]: "fading-in",
          }));

          // Start playing at volume 0
          audioElement.volume = 0;
          audioElement.play();

          // Target volume (either previous volume or default 50%)
          const targetVolume =
            audioData.volume > 0 ? audioData.volume / 100 : 0.5;

          // Update state immediately to show playing status
          setActiveAudio((prev) => ({
            ...prev,
            [audioKey]: {
              ...prev[audioKey],
              isPlaying: true,
            },
          }));

          // Fade in audio gradually
          let currentStep = 0;

          const fadeIn = () => {
            currentStep++;
            if (currentStep <= FADE_STEPS) {
              const newVolume = (targetVolume / FADE_STEPS) * currentStep;
              audioElement.volume = newVolume;
              setTimeout(fadeIn, stepDuration);
            } else {
              // Set final volume precisely
              audioElement.volume = targetVolume;

              setAudioFadeState((prev) => ({
                ...prev,
                [audioKey]: "none",
              }));
            }
          };

          fadeIn();
        }
      }
    }
  };

  // Reset all selections
  const clearAllSelections = () => {
    setSelectedLocation(null);
    setSelectedPortraits([]);
    clearVideo();

    // Stop all audio
    Object.keys(activeAudio).forEach((key) => {
      stopAudio(key);
    });
  };

  // Stop all audio
  const fadeAllAudio = () => {
    Object.keys(activeAudio).forEach((key) => {
      stopAudio(key);
    });
  };

  // Display images in a grid
  const displayImages = (images: ImageFile[], isLocation: boolean) => (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3}>
      {images.map((fileObject, index) => (
        <FileThumbnail
          key={index}
          fileObject={fileObject}
          isSelected={isImageSelected(index, isLocation)}
          onClick={() => handleImageClick(index, isLocation)}
          type="image"
        />
      ))}
    </SimpleGrid>
  );

  // Display videos in a grid
  const displayVideos = (videos: VideoFile[]) => (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={3}>
      {videos.map((fileObject, index) => {
        // Check if this video is currently playing (in either background or event)
        const isSelected =
          currentlyPlayingVideo.background?.file.name ===
            fileObject.file.name ||
          currentlyPlayingVideo.event?.file.name === fileObject.file.name;

        return (
          <FileThumbnail
            key={index}
            fileObject={fileObject}
            isSelected={isSelected}
            onClick={() => playVideo(fileObject.file.name)}
            type="video"
          />
        );
      })}
    </SimpleGrid>
  );

  // Display audio files in a grid
  const displayAudioFiles = (audioFiles: AudioFile[]) => (
    <SimpleGrid columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={4}>
      {audioFiles.map((fileObject, index) => {
        // Check if this audio is already active
        const isActive = Object.keys(activeAudio).includes(
          fileObject.file.name
        );

        // Determine which icon to show based on audio type
        let audioTypeIcon;
        if (fileObject.music) {
          audioTypeIcon = <MusicNoteIcon fontSize="small" />;
        } else if (fileObject.loop) {
          audioTypeIcon = <LoopIcon fontSize="small" />;
        } else {
          audioTypeIcon = <PlayArrowIcon fontSize="small" />;
        }

        return (
          <VStack
            key={index}
            p={3}
            border="1px solid gray"
            bg={isActive ? "blue.700" : "gray.800"}
            cursor="pointer"
            borderRadius="md"
            width="100%"
            height="140px"
            justify="space-between"
            align="center"
            _hover={{ bg: isActive ? "blue.700" : "blue.800" }}
            transition="all 0.2s"
            onClick={() => !isActive && playAudio(fileObject)}
          >
            <Text fontSize="sm" noOfLines={2} textAlign="center" color="white">
              {parseFilename(fileObject.file.name)}
            </Text>

            <Center
              bg={
                fileObject.music
                  ? "purple.600"
                  : fileObject.loop
                  ? "blue.600"
                  : "green.600"
              }
              borderRadius="full"
              p={3}
              boxSize="60px"
              opacity={isActive ? 1 : 0.7}
              _hover={{ opacity: 1 }}
              my={2}
            >
              {audioTypeIcon}
            </Center>
          </VStack>
        );
      })}
    </SimpleGrid>
  );

  // Check if we have any files at all
  const hasFiles =
    droppedAudioFiles.length > 0 ||
    droppedImages.length > 0 ||
    droppedVideos.length > 0;

  // Calculate sidebar content
  const activeLocationImage = selectedLocation
    ? locationImages.find((img) => img.file.name === selectedLocation) || null
    : null;

  const activePortraitImages = selectedPortraits
    .map((filename) => portraitImages.find((img) => img.file.name === filename))
    .filter(Boolean) as ImageFile[];

  const hasActiveSoundEffects = Object.values(activeAudio).some(
    (data) => !data.audio.loop && !data.audio.music
  );
  const hasActiveLoopingSoundEffects = Object.values(activeAudio).some(
    (data) => data.audio.loop && !data.audio.music
  );
  const hasActiveMusic = Object.values(activeAudio).some(
    (data) => data.audio.music
  );

  // Sidebar visibility
  const hasSidebarContent =
    currentlyPlayingVideo.background !== null ||
    currentlyPlayingVideo.event !== null ||
    activeLocationImage !== null ||
    activePortraitImages.length > 0 ||
    Object.keys(activeAudio).length > 0;

  return (
    <Box
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {!hasFiles ? (
        <VStack
          justify="center"
          align="center"
          h="100%"
          p={10}
          bg="gray.800"
          borderWidth={2}
          borderStyle="dashed"
          borderColor="gray.600"
          borderRadius="md"
          m={4}
        >
          <Text fontSize="xl" color="gray.400">
            Drag and drop your files here
          </Text>
          <Text fontSize="md" color="gray.500">
            Audio, Images, and Videos supported
          </Text>
        </VStack>
      ) : (
        <Flex flex={1} overflow="hidden">
          {/* Main Content */}
          <Box flex="1" overflow="auto">
            <Tabs
              variant="soft-rounded"
              colorScheme="blue"
              p={3}
              h="100%"
              display="flex"
              flexDirection="column"
            >
              <TabList mb={4} flexWrap="wrap">
                {loopingMusic.length > 0 && (
                  <Tab>
                    <HStack spacing={1}>
                      <MusicNoteIcon fontSize="small" />
                      <Text>BGM</Text>
                    </HStack>
                  </Tab>
                )}
                {loopingSoundEffects.length > 0 && (
                  <Tab>
                    <HStack spacing={1}>
                      <LoopIcon fontSize="small" />
                      <Text>Loops</Text>
                    </HStack>
                  </Tab>
                )}
                {soundEffects.length > 0 && (
                  <Tab>
                    <HStack spacing={1}>
                      <VolumeUpIcon fontSize="small" />
                      <Text>SFX</Text>
                    </HStack>
                  </Tab>
                )}
                {(locationImages.length > 0 || backgroundVideos.length > 0) && (
                  <Tab>
                    <HStack spacing={1}>
                      <LandscapeIcon fontSize="small" />
                      <Text>Backgrounds</Text>
                    </HStack>
                  </Tab>
                )}
                {portraitImages.length > 0 && (
                  <Tab>
                    <HStack spacing={1}>
                      <PeopleIcon fontSize="small" />
                      <Text>Characters</Text>
                    </HStack>
                  </Tab>
                )}
                {eventVideos.length > 0 && (
                  <Tab>
                    <HStack spacing={1}>
                      <MovieIcon fontSize="small" />
                      <Text>Events</Text>
                    </HStack>
                  </Tab>
                )}
              </TabList>

              <TabPanels flex="1" overflow="auto">
                {loopingMusic.length > 0 && (
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="sm" color="gray.300">
                        Background Music
                      </Heading>
                      <Divider />
                      <Box>{displayAudioFiles(loopingMusic)}</Box>
                    </VStack>
                  </TabPanel>
                )}

                {loopingSoundEffects.length > 0 && (
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="sm" color="gray.300">
                        Looping Sound Effects
                      </Heading>
                      <Divider />
                      <Box>{displayAudioFiles(loopingSoundEffects)}</Box>
                    </VStack>
                  </TabPanel>
                )}

                {soundEffects.length > 0 && (
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Heading size="sm" color="gray.300">
                        Sound Effects
                      </Heading>
                      <Divider />
                      <Box>{displayAudioFiles(soundEffects)}</Box>
                    </VStack>
                  </TabPanel>
                )}

                {(locationImages.length > 0 || backgroundVideos.length > 0) && (
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      {locationImages.length > 0 && (
                        <>
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Heading size="sm" color="gray.300">
                              Image Backgrounds
                            </Heading>
                            <Button
                              size="sm"
                              onClick={() => setSelectedLocation(null)}
                              colorScheme="red"
                              isDisabled={selectedLocation === null}
                            >
                              Clear Selection
                            </Button>
                          </Flex>
                          <Divider />
                          <Box mb={6}>
                            {displayImages(locationImages, true)}
                          </Box>
                        </>
                      )}

                      {backgroundVideos.length > 0 && (
                        <>
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Heading size="sm" color="gray.300">
                              Video Backgrounds
                            </Heading>
                            {currentlyPlayingVideo.background && (
                              <Button
                                size="sm"
                                onClick={clearVideo}
                                colorScheme="red"
                              >
                                Stop Video
                              </Button>
                            )}
                          </Flex>
                          <Divider />
                          <Box>{displayVideos(backgroundVideos)}</Box>
                        </>
                      )}
                    </VStack>
                  </TabPanel>
                )}

                {portraitImages.length > 0 && (
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm" color="gray.300">
                          Characters
                        </Heading>
                        <Button
                          size="sm"
                          onClick={() => setSelectedPortraits([])}
                          colorScheme="red"
                          isDisabled={selectedPortraits.length === 0}
                        >
                          Clear Selections
                        </Button>
                      </Flex>
                      <Divider />
                      <Box>{displayImages(portraitImages, false)}</Box>
                    </VStack>
                  </TabPanel>
                )}

                {eventVideos.length > 0 && (
                  <TabPanel>
                    <VStack align="stretch" spacing={4}>
                      <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm" color="gray.300">
                          Event Videos
                        </Heading>
                        {currentlyPlayingVideo.event && (
                          <Button
                            size="sm"
                            onClick={clearVideo}
                            colorScheme="red"
                          >
                            Stop Video
                          </Button>
                        )}
                      </Flex>
                      <Divider />
                      <Box>{displayVideos(eventVideos)}</Box>
                    </VStack>
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </Box>

          {/* Sidebar for active content */}
          {hasSidebarContent && (
            <Box
              width="250px"
              bg="gray.800"
              p={3}
              borderLeft="1px solid"
              borderColor="gray.700"
              overflowY="auto"
            >
              {/* Global Controls (moved from top to sidebar) */}
              <VStack spacing={2} mb={4} align="stretch">
                <Heading size="xs" color="gray.400" mb={1}>
                  DISPLAY CONTROLS
                </Heading>
                <SimpleGrid columns={2} spacing={2}>
                  <Button
                    size="sm"
                    onClick={() => setShowNames(!showNames)}
                    colorScheme={showNames ? "red" : "green"}
                  >
                    {showNames ? "Hide Names" : "Show Names"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setBlackOverlay(!blackOverlay)}
                    colorScheme={blackOverlay ? "green" : "red"}
                  >
                    {blackOverlay ? "Reveal Display" : "Hide Display"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={clearAllSelections}
                    colorScheme="red"
                  >
                    Clear All
                  </Button>
                  {Object.keys(activeAudio).length > 0 ? (
                    <Button size="sm" onClick={fadeAllAudio} colorScheme="red">
                      Fade Audio
                    </Button>
                  ) : (
                    <Box></Box> /* Empty placeholder when no audio is active */
                  )}
                </SimpleGrid>
                <Divider mt={2} />
              </VStack>

              <VStack align="stretch" spacing={4}>
                {/* Active Event Videos */}
                {currentlyPlayingVideo.event && (
                  <SidebarItem
                    title="Event Video"
                    onClose={() => clearVideo()}
                    icon={<VideocamIcon fontSize="small" />}
                  >
                    <Text fontSize="xs" color="gray.400">
                      {parseFilename(currentlyPlayingVideo.event.file.name)}
                    </Text>
                  </SidebarItem>
                )}

                {/* Characters/Portraits */}
                {activePortraitImages.length > 0 && (
                  <Box>
                    <Heading size="xs" color="gray.400" mb={2}>
                      CHARACTERS
                    </Heading>
                    {activePortraitImages.map((image, index) => (
                      <SidebarItem
                        key={index}
                        title={parseFilename(image.file.name)}
                        onClose={() =>
                          setSelectedPortraits((prev) =>
                            prev.filter(
                              (filename) => filename !== image.file.name
                            )
                          )
                        }
                        icon={<PhotoIcon fontSize="small" />}
                      >
                        <Image
                          src={image.src}
                          alt={image.file.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </SidebarItem>
                    ))}
                  </Box>
                )}

                {/* Background Image or Video */}
                {(activeLocationImage || currentlyPlayingVideo.background) && (
                  <Box>
                    <Heading size="xs" color="gray.400" mb={2}>
                      BACKGROUND
                    </Heading>
                    {activeLocationImage && (
                      <SidebarItem
                        title={parseFilename(activeLocationImage.file.name)}
                        onClose={() => setSelectedLocation(null)}
                        icon={<PhotoIcon fontSize="small" />}
                      >
                        <Image
                          src={activeLocationImage.src}
                          alt={activeLocationImage.file.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </SidebarItem>
                    )}

                    {currentlyPlayingVideo.background && (
                      <SidebarItem
                        title={parseFilename(
                          currentlyPlayingVideo.background.file.name
                        )}
                        onClose={() => playVideo("")}
                        icon={<VideocamIcon fontSize="small" />}
                      >
                        <Image
                          src={currentlyPlayingVideo.background.thumbnail}
                          alt={currentlyPlayingVideo.background.file.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </SidebarItem>
                    )}
                  </Box>
                )}

                {/* Active Audio Files */}
                {Object.keys(activeAudio).length > 0 && (
                  <Box>
                    {/* Sound Effects */}
                    {hasActiveSoundEffects && (
                      <Box mb={3}>
                        <Heading size="xs" color="gray.400" mb={2}>
                          SOUND EFFECTS
                        </Heading>
                        {Object.entries(activeAudio)
                          .filter(
                            ([_, data]) => !data.audio.loop && !data.audio.music
                          )
                          .map(([key, data]) => (
                            <SidebarItem
                              key={key}
                              title={parseFilename(data.audio.file.name)}
                              onClose={() => stopAudio(key, false)} // Pass false to prevent fading
                              icon={<VolumeUpIcon fontSize="small" />}
                            >
                              <AudioControls
                                audio={data.audio}
                                volume={data.volume}
                                setVolume={(value) =>
                                  setAudioVolume(key, value)
                                }
                                isPlaying={data.isPlaying}
                                togglePlay={() => toggleAudioPlayback(key)}
                                isFading={
                                  audioFadeState[key] === "fading-in" ||
                                  audioFadeState[key] === "fading-out"
                                }
                                fadeState={audioFadeState[key]}
                              />
                            </SidebarItem>
                          ))}
                      </Box>
                    )}

                    {/* Looping Sound Effects */}
                    {hasActiveLoopingSoundEffects && (
                      <Box mb={3}>
                        <Heading size="xs" color="gray.400" mb={2}>
                          LOOPING SFX
                        </Heading>
                        {Object.entries(activeAudio)
                          .filter(
                            ([_, data]) => data.audio.loop && !data.audio.music
                          )
                          .map(([key, data]) => (
                            <SidebarItem
                              key={key}
                              title={parseFilename(data.audio.file.name)}
                              onClose={() => stopAudio(key)}
                              icon={<LoopIcon fontSize="small" />}
                            >
                              <AudioControls
                                audio={data.audio}
                                volume={data.volume}
                                setVolume={(value) =>
                                  setAudioVolume(key, value)
                                }
                                isPlaying={data.isPlaying}
                                togglePlay={() => toggleAudioPlayback(key)}
                                isFading={
                                  audioFadeState[key] === "fading-in" ||
                                  audioFadeState[key] === "fading-out"
                                }
                                fadeState={audioFadeState[key]}
                              />
                            </SidebarItem>
                          ))}
                      </Box>
                    )}

                    {/* Background Music */}
                    {hasActiveMusic && (
                      <Box>
                        <Heading size="xs" color="gray.400" mb={2}>
                          BACKGROUND MUSIC
                        </Heading>
                        {Object.entries(activeAudio)
                          .filter(([_, data]) => data.audio.music)
                          .map(([key, data]) => (
                            <SidebarItem
                              key={key}
                              title={parseFilename(data.audio.file.name)}
                              onClose={() => stopAudio(key)}
                              icon={<MusicNoteIcon fontSize="small" />}
                            >
                              <AudioControls
                                audio={data.audio}
                                volume={data.volume}
                                setVolume={(value) =>
                                  setAudioVolume(key, value)
                                }
                                isPlaying={data.isPlaying}
                                togglePlay={() => toggleAudioPlayback(key)}
                                isFading={
                                  audioFadeState[key] === "fading-in" ||
                                  audioFadeState[key] === "fading-out"
                                }
                                fadeState={audioFadeState[key]}
                              />
                            </SidebarItem>
                          ))}
                      </Box>
                    )}
                  </Box>
                )}
              </VStack>
            </Box>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default FileManager;
