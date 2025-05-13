import {
  Box,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import AudioFileDropper from "./AudioFileDropper";
import ImageDropper from "./ImageDropper";
import ScoreInput from "./ScoreInput";
import InitiativeTracker from "../components/InitiativeTracker";
import { PlayerManager } from "../components/PlayerManager";
import { EncounterManager } from "../components/EncounterManager";
import Header from "../components/Header";

export default function Home() {
  const [scores, setScores] = useState([]);
  const [popupWindow, setPopupWindow] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPortraits, setSelectedPortraits] = useState([]);
  const [droppedImages, setDroppedImages] = useState([]);
  const [droppedVideos, setDroppedVideos] = useState([]);
  const [showNames, setShowNames] = useState(false);
  const [blackOverlay, setBlackOverlay] = useState(false);
  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState(null);
  const [activeSection, setActiveSection] = useState('sounds');

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
      if (currentlyPlayingVideo !== null && currentlyPlayingVideo?.isBackground)
        clearVideo();
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'sounds':
        return (
          <HStack spacing={5} w="100%" height="100%">
            <Box flex={1} p={3} maxHeight="100%" height="100%" overflow="auto" borderWidth={1} borderRadius="md" w="100%">
              <AudioFileDropper />
            </Box>
            <Box flex={1} p={3} borderWidth={1} borderRadius="md" maxHeight="100%" height="100%" overflow="auto">
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
        );
      case 'initiative':
        return <InitiativeTracker />;
      case 'players':
        return <PlayerManager />;
      case 'monsters':
        return <EncounterManager />;
      case 'death':
        return <ScoreInput scores={scores} setScores={setScores} />;
      case 'setup':
        return (
          <VStack spacing={4} align="start" p={4}>
            <Button colorScheme="blue" onClick={handlePopup}>
              Open Display Popup
            </Button>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
}