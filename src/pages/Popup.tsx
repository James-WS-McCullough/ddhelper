import React, { useState, useEffect, useRef } from "react";
import { Image, Box, Text, SimpleGrid } from "@chakra-ui/react";
import ScoreDisplay from "./ScoreDisplay";
import PopupBattleMap from "../components/PopupBattleMap";
import { parseFilename } from "../generics/parseFilename";
import { BattleMapStorage } from "../generics/localStorageHelpers";

type portrait = {
  src: string;
  name: string;
};

const Popup = () => {
  const [locationSrc, setLocationSrc] = useState(null);
  const [portraitsSrcs, setPortraitsSrcs] = useState([] as portrait[]);
  const [receivedScores, setReceivedScores] = useState([]);
  const [showNames, setShowNames] = useState(false);
  const backgroundVideoRef = useRef(null);
  const eventVideoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [useBlackOverlay, setUseBlackOverlay] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [battleMapData, setBattleMapData] = useState<BattleMapStorage | null>(
    null
  );
  const [droppedImages, setDroppedImages] = useState([]);
  const [battleMapZoom, setBattleMapZoom] = useState(1.0); // Default zoom level
  const [focusedTile, setFocusedTile] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [isInMoveMode, setIsInMoveMode] = useState(false);
  const [movementRange, setMovementRange] = useState(6); // Default 30ft (6 squares)

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "DATA_UPDATE") {
        setReceivedScores(event.data.data.scores);
        setLocationSrc(event.data.data.locationSrc);
        setPortraitsSrcs(event.data.data.portraitsSrcs);
        setShowNames(event.data.data.showNames);
        setUseBlackOverlay(event.data.data.blackOverlay);
        setBattleMapData(event.data.data.battleMapData);
        setDroppedImages(event.data.data.droppedImages || []);
        setBattleMapZoom(event.data.data.battleMapZoom || 1.0);
        setFocusedTile(event.data.data.focusedTile || null);
      }
      if (event.data.type === "MOVEMENT_UPDATE") {
        setSelectedToken(event.data.data.selectedToken);
        setIsInMoveMode(event.data.data.isInMoveMode);
        setMovementRange(event.data.data.movementRange);
      }
      if (event.data.type === "VIDEO_PLAY") {
        const videoIsBackgrond = event.data.data.isBackground;
        if (videoIsBackgrond) {
          if (backgroundVideoRef.current) {
            backgroundVideoRef.current.src = event.data.data.src;
            backgroundVideoRef.current.play();
            setIsVideoPlaying(true);
          }
        } else {
          if (eventVideoRef.current) {
            eventVideoRef.current.src = event.data.data.src;
            eventVideoRef.current.play();
            setIsVideoPlaying(true);
            setUseBlackOverlay(true);
            setOverlayOpacity(1);
          }
        }
      }
      if (event.data.type === "VIDEO_CLEAR") {
        if (backgroundVideoRef.current) {
          backgroundVideoRef.current.src = "";
        }
        if (eventVideoRef.current) {
          eventVideoRef.current.src = "";
        }
        setIsVideoPlaying(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // useEffect to hide the video after it finishes playing
  useEffect(() => {
    if (eventVideoRef.current) {
      eventVideoRef.current.onended = () => {
        // When event video finishes, clear the src
        eventVideoRef.current.src = "";
        setIsVideoPlaying(false);

        // Fade the overlay back to normal
        setOverlayOpacity(1);

        // Send a message back to the parent window to clear the currentlyPlayingVideo state
        // This makes sure the video is removed from the sidebar
        window.opener.postMessage({ type: "EVENT_VIDEO_ENDED" }, "*");

        // Gradually fade back the underlying content
        const revealContent = () => {
          setUseBlackOverlay(false);
        };

        // Add a slight delay before revealing content to create a smooth transition
        setTimeout(revealContent, 500);
      };
    }
  }, [eventVideoRef]);

  // Use effect to slowly brighten/darken the overlay to match the useBlackOverlay state over 3 seconds
  useEffect(() => {
    if (useBlackOverlay) {
      const interval = setInterval(() => {
        setOverlayOpacity((prev) => {
          if (prev < 1) {
            return Math.min(prev + 0.01, 1);
          }
          return 1;
        });
      }, 30);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setOverlayOpacity((prev) => {
          if (prev > 0) {
            return Math.max(prev - 0.01, 0);
          }
          return 0;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [useBlackOverlay]);

  const renderPortraits = () => {
    const numPortraits = portraitsSrcs.length;

    // If 4 or more images, just render them in a grid
    if (numPortraits >= 4) {
      return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" zIndex="10">
          {portraitsSrcs.map((portrait, index) => (
            <Box key={index} flexBasis={{ base: "50%", md: "25%" }} p={2}>
              <img
                src={portrait.src}
                alt={`Portrait ${index}`}
                style={{ width: "100%", height: "auto" }}
              />
              {showNames && !(portrait.name[0] === "_") && (
                <Text
                  padding="1"
                  fontSize="2xl"
                  textAlign="center"
                  background="RGBA(0, 0, 0, 0.64)"
                  borderBottomRadius="5"
                  textColor="white"
                >
                  {parseFilename(portrait.name)}
                </Text>
              )}
            </Box>
          ))}
        </Box>
      );
    }

    // For 1-3 images, render them as larger images centered on the screen
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80%"
        zIndex="10"
      >
        {portraitsSrcs.map((portrait, index) => (
          <Box key={index} flexBasis="100%" p={2}>
            <img
              src={portrait.src}
              alt={`Portrait ${index}`}
              style={{ maxWidth: "100%", maxHeight: "80vh" }}
            />
            {showNames && (
              <Text
                padding="1"
                fontSize="2xl"
                textAlign="center"
                background="RGBA(0, 0, 0, 0.64)"
                textColor="white"
                borderBottomRadius="5"
              >
                {!(portrait.name[0] === "_")
                  ? parseFilename(portrait.name)
                  : "???"}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      bg={
        (!battleMapData || !battleMapData.showGrid) && locationSrc
          ? `url(${locationSrc}) center/cover no-repeat`
          : "black"
      }
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="0"
    >
      <Box
        position="absolute"
        width="100%"
        height="100%"
        bg={"black"}
        opacity={overlayOpacity}
        zIndex="15"
      />
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="1"
        alignContent="center"
        bg={isVideoPlaying ? "black" : "transparent"}
      >
        <video
          ref={backgroundVideoRef}
          width="100%"
          height="100%"
          loop
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100vw",
            height: "100vh",
          }}
        />
      </Box>
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex="20"
        alignContent="center"
      >
        <video
          ref={eventVideoRef}
          width="100%"
          height="100%"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100vw",
            height: "100vh",
          }}
        />
      </Box>

      {/* Battle Map Display */}
      {battleMapData && battleMapData.showGrid && (
        <PopupBattleMap
          battleMapData={battleMapData}
          droppedImages={droppedImages}
          zoomLevel={battleMapZoom}
          focusedTile={focusedTile}
          selectedToken={selectedToken}
          isInMoveMode={isInMoveMode}
          movementRange={movementRange}
        />
      )}

      {/* Only show portraits and scores if battle map is not active */}
      {(!battleMapData || !battleMapData.showGrid) && (
        <>
          {renderPortraits()}
          <Box
            position={"absolute"}
            display="flex"
            flexWrap="wrap"
            justifyContent={
              receivedScores.length === 1 ? "center" : "flex-start"
            }
            width="100%"
          >
            {receivedScores.map((score) => (
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
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Popup;
