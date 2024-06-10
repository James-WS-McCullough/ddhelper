import {
  Box,
  Button,
  HStack,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import AudioFileDropper from "./AudioFileDropper";
import ImageDropper from "./ImageDropper";
import ScoreInput from "./ScoreInput";
import { useEffect, useState } from "react";
import AttackForm from "../components/AttackInput";
import InitiativeTracker from "../components/InitiativeTracker";
import SectionTab from "../components/SectionTab";
import { StatBlockInput } from "../components/StatBlockInput";
import { PlayerForm } from "../components/PlayerForm";
import { PlayerManager } from "../components/PlayerManager";
import ScrollableTabPanel from "../components/ScrollableTabPannel";
import { EncounterManager } from "../components/EncounterManager";
import { D20Icon } from "../assets/D20icon";

export default function Home2() {
  const [scores, setScores] = useState([]); // An array to hold the scores
  const [popupWindow, setPopupWindow] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPortraits, setSelectedPortraits] = useState([]);
  const [droppedImages, setDroppedImages] = useState([]);
  const [droppedVideos, setDroppedVideos] = useState([]);
  const [showNames, setShowNames] = useState(false);
  const [blackOverlay, setBlackOverlay] = useState(false);
  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState(null);

  const handlePopup = () => {
    if (!popupWindow || popupWindow.closed) {
      const win = window.open(
        "/popup",
        "_blank",
        "toolbar=no,location=no,status=no,menubar=no"
      );
      setPopupWindow(win);
      setSelectedLocation(null);
      setSelectedPortraits([]);
    }
  };

  const selectNewSelectedLocation = (index) => {
    if (selectedLocation === index) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(index);
      if (currentlyPlayingVideo != null && currentlyPlayingVideo?.isBackground)
        clearVideo();
    }
  };

  useEffect(() => {
    if (popupWindow) {
      // Prepare the image sources
      const locationImages = droppedImages.filter((img) =>
        img.file.name.includes("location")
      );
      const portraitImages = droppedImages.filter(
        (img) => !img.file.name.includes("location")
      );

      const locationSrc =
        selectedLocation !== null ? locationImages[selectedLocation].src : null;
      const portraitsSrcs = selectedPortraits.map((index) => ({
        src: portraitImages[index].src,
        name: portraitImages[index].file.name,
      }));

      // Now, every time scores, location, or portrait selections change, send the data to the popup
      const message = {
        type: "DATA_UPDATE",
        data: {
          scores,
          locationSrc,
          portraitsSrcs,
          showNames,
          blackOverlay,
        },
      };
      popupWindow.postMessage(message, "*");
    }
  }, [
    scores,
    selectedLocation,
    selectedPortraits,
    popupWindow,
    showNames,
    blackOverlay,
  ]);

  const playVideo = (filename) => {
    const video = droppedVideos.find((video) => video.file.name === filename);
    // Sent the video to the popup
    const message = {
      type: "VIDEO_PLAY",
      data: {
        src: video.src,
        isBackground: video.isBackground,
      },
    };
    popupWindow.postMessage(message, "*");
    setCurrentlyPlayingVideo(video);
  };

  const clearVideo = () => {
    const message = {
      type: "VIDEO_CLEAR",
    };
    popupWindow.postMessage(message, "*");
    setCurrentlyPlayingVideo(null);
  };

  return (
    <VStack
      display="flex"
      flexDirection="column"
      justifyContent="space-between" // space between main content and the footer
      alignItems="center"
      h="100vh" // full height of the viewport
      maxHeight="100vh"
      spacing={3}
      bg="gray.800"
      color="white"
      p={5}
    >
      <HStack>
        <D20Icon size={50} />
        <Heading>D&D HELPER</Heading>
      </HStack>
      <Tabs isFitted variant="enclosed" w="100%" height="calc(100% - 100px)">
        <TabList>
          <SectionTab>Sound + Images</SectionTab>
          <SectionTab>Initiative Tracker</SectionTab>
          <SectionTab>Player Config</SectionTab>
          <SectionTab>Monster Designer</SectionTab>
          <SectionTab>Death Throw Display</SectionTab>
          <SectionTab>Setup</SectionTab>
        </TabList>
        <TabPanels w="100%" height="calc(100% - 60px)">
          <TabPanel w="100%" height="100%">
            <HStack spacing={5} w="100%" height="100%">
              <Box
                flex={1}
                p={3}
                display="flex"
                flexDirection="column" // Ensures the flex items are stacked vertically
                maxHeight="100%"
                height="100%"
                overflow="auto"
                borderWidth={1}
                borderRadius="md"
                w="100%"
              >
                <AudioFileDropper />
              </Box>

              <Box
                flex={1}
                p={3}
                borderWidth={1}
                borderRadius="md"
                display="flex"
                flexDirection="column" // Ensures the flex items are stacked vertically
                maxHeight="100%"
                height="100%"
                overflow="auto"
              >
                <ImageDropper
                  selectedLocation={selectedLocation}
                  setSelectedLocation={selectNewSelectedLocation}
                  selectedPortraits={selectedPortraits}
                  setSelectedPortraits={setSelectedPortraits}
                  droppedImages={droppedImages}
                  setDroppedImages={setDroppedImages}
                  setShowNames={setShowNames}
                  showNames={showNames}
                  droppedVideos={droppedVideos}
                  setDroppedVideos={setDroppedVideos}
                  playVideo={playVideo}
                  clearVideo={clearVideo}
                  currentlyPlayingVideo={currentlyPlayingVideo}
                  blackOverlay={blackOverlay}
                  setBlackOverlay={setBlackOverlay}
                />
              </Box>
            </HStack>
          </TabPanel>
          <ScrollableTabPanel>
            <InitiativeTracker />
          </ScrollableTabPanel>
          <ScrollableTabPanel>
            <PlayerManager />
          </ScrollableTabPanel>
          <ScrollableTabPanel>
            <EncounterManager />
          </ScrollableTabPanel>
          <ScrollableTabPanel>
            <ScoreInput scores={scores} setScores={setScores} />
          </ScrollableTabPanel>
          <TabPanel>
            <Text fontSize="xl" marginBottom="3">
              Open Display Popup
            </Text>
            <Button colorScheme="blue" onClick={handlePopup}>
              Open Popup
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
