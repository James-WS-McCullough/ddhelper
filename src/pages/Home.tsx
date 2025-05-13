import {
  Box,
  Button,
  HStack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import ScoreInput from "./ScoreInput";
import { useEffect, useState } from "react";
import InitiativeTracker from "../components/InitiativeTracker";
import ScrollableTabPanel from "../components/ScrollableTabPannel";
import { PlayerManager } from "../components/PlayerManager";
import { EncounterManager } from "../components/EncounterManager";
import { HeaderBar } from "../components/HeaderBar";
import FileManager from "../components/FileManager/FileManager";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [scores, setScores] = useState([]);
  const [popupWindow, setPopupWindow] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPortraits, setSelectedPortraits] = useState([]);
  const [droppedImages, setDroppedImages] = useState([]);
  const [droppedVideos, setDroppedVideos] = useState([]);
  const [droppedAudioFiles, setDroppedAudioFiles] = useState([]);
  const [showNames, setShowNames] = useState(true);
  const [blackOverlay, setBlackOverlay] = useState(false);

  // Replace the single video state with a video state object that tracks background and event videos separately
  const [activeVideos, setActiveVideos] = useState({
    background: null,
    event: null,
  });

  const location = useLocation();

  // Get category from URL parameters or default to "all"
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category") || "all";

  const options = [
    { value: "all", label: "Home" },
    { value: "initiative", label: "Initiative Tracker" },
    { value: "deaththrowdisplay", label: "Death Throw Display" },
    { value: "playerconfig", label: "Player Config" },
    { value: "monsterconfig", label: "Monster Config" },
    { value: "setup", label: "Setup" },
  ];

  // Find the index of the current category in options
  const tabIndex = options.findIndex(
    (option) => option.value === currentCategory
  );

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
      if (activeVideos.background !== null) clearVideo();
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

  // Listen for messages from the popup window
  useEffect(() => {
    const handleMessage = (event) => {
      // Handle the event video ended message from popup
      if (event.data.type === "EVENT_VIDEO_ENDED") {
        // Only clear if the current video is an event video (not a background)
        if (activeVideos.event) {
          setActiveVideos((prev) => ({ ...prev, event: null }));
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [activeVideos]);

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
    setActiveVideos((prev) => ({
      ...prev,
      [video.isBackground ? "background" : "event"]: video,
    }));
    if (video.isBackground) {
      setSelectedLocation(null);
    }
  };

  const clearVideo = () => {
    const message = {
      type: "VIDEO_CLEAR",
    };
    popupWindow.postMessage(message, "*");
    setActiveVideos({ background: null, event: null });
  };

  return (
    <VStack
      bg="gray.800"
      color="white"
      display="flex"
      height={"100vh"}
      spacing={0}
    >
      <HeaderBar />
      <VStack
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        height="calc(100vh - 60px)"
        w="100%"
      >
        <Tabs
          variant="enclosed"
          w="100%"
          flex={1}
          height="100%"
          index={tabIndex >= 0 ? tabIndex : 0}
        >
          <TabPanels w="100%" height="100%">
            <TabPanel w="100%" height="100%">
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                maxHeight="100%"
                height="100%"
                overflow="auto"
                w="100%"
              >
                <FileManager
                  droppedAudioFiles={droppedAudioFiles}
                  setDroppedAudioFiles={setDroppedAudioFiles}
                  droppedImages={droppedImages}
                  setDroppedImages={setDroppedImages}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={selectNewSelectedLocation}
                  selectedPortraits={selectedPortraits}
                  setSelectedPortraits={setSelectedPortraits}
                  showNames={showNames}
                  setShowNames={setShowNames}
                  droppedVideos={droppedVideos}
                  setDroppedVideos={setDroppedVideos}
                  playVideo={playVideo}
                  clearVideo={clearVideo}
                  currentlyPlayingVideo={activeVideos}
                  blackOverlay={blackOverlay}
                  setBlackOverlay={setBlackOverlay}
                />
              </Box>
            </TabPanel>
            <ScrollableTabPanel>
              <InitiativeTracker />
            </ScrollableTabPanel>
            <ScrollableTabPanel>
              <ScoreInput scores={scores} setScores={setScores} />
            </ScrollableTabPanel>
            <ScrollableTabPanel>
              <PlayerManager />
            </ScrollableTabPanel>
            <ScrollableTabPanel>
              <EncounterManager />
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
    </VStack>
  );
}
