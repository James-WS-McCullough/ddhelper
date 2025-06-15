import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Image,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Spinner,
  Input,
  Switch,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import GridOnIcon from "@mui/icons-material/GridOn";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import ImageIcon from "@mui/icons-material/Image";
import { parseFilename } from "../generics/parseFilename";
import {
  loadBattleMapFromStorage,
  saveBattleMapToStorage,
} from "../generics/localStorageHelpers";

interface ImageFile {
  file: File;
  src: string;
}

interface GridToken {
  id: string;
  imageFile: ImageFile;
  gridX: number;
  gridY: number;
}

interface BattleMapProps {
  droppedImages: ImageFile[];
  onBattleMapUpdate?: (
    tokens: GridToken[],
    gridWidth: number,
    gridHeight: number,
    showGrid: boolean,
    zoomLevel?: number,
    focusedTile?: { x: number; y: number },
    selectedToken?: string | null,
    isInMoveMode?: boolean,
    movementRange?: number
  ) => void;
  tokens?: GridToken[];
  gridWidth?: number;
  gridHeight?: number;
  showGrid?: boolean;
  isDisplayMode?: boolean;
  zoomLevel?: number;
  onZoomChange?: (newZoom: number) => void;
  onFocusChange?: (focusedTile: { x: number; y: number } | null) => void;
}

interface GridCellProps {
  x: number;
  y: number;
  token?: GridToken;
  isSelected: boolean;
  isFocused: boolean;
  isInMovementRange: boolean;
  localShowGrid: boolean;
  isDisplayMode: boolean;
  onGridClick: (x: number, y: number) => void;
  onRemoveToken: (tokenId: string) => void;
  setSelectedToken: (tokenId: string | null) => void;
}

const GridCell: React.FC<GridCellProps> = ({
  x,
  y,
  token,
  isSelected,
  isFocused,
  isInMovementRange,
  localShowGrid,
  isDisplayMode,
  onGridClick,
  onRemoveToken,
  setSelectedToken,
}) => {
  // Determine background color based on state
  let bgColor = "transparent";
  if (isSelected) {
    bgColor = "blue.500";
  } else if (isFocused) {
    bgColor = "yellow.100";
  } else if (isInMovementRange) {
    bgColor = "green.200";
  }

  return (
    <GridItem
      border="1px solid" // Always show grid lines in back office
      borderColor={
        isFocused ? "yellow.400" : isInMovementRange ? "green.400" : "gray.600"
      }
      bg={bgColor}
      position="relative"
      w="100%"
      h="100%"
      cursor={isDisplayMode ? "default" : "pointer"}
      onClick={() => onGridClick(x, y)}
      _hover={
        isDisplayMode
          ? {}
          : { bg: isInMovementRange ? "green.300" : "gray.700" }
      }
      transition="all 0.2s ease"
      zIndex="2" // Ensure grid cells appear above the background
      overflow="hidden" // Prevent content from expanding the cell
    >
      {token && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex="3"
          overflow="hidden"
        >
          <Image
            src={token.imageFile.src}
            alt={parseFilename(token.imageFile.file.name)}
            width="100%"
            height="100%"
            objectFit="cover"
            draggable={false}
            pointerEvents="none"
            position="absolute"
            top="0"
            left="0"
          />
        </Box>
      )}
    </GridItem>
  );
};

const BattleMap: React.FC<BattleMapProps> = ({
  droppedImages,
  onBattleMapUpdate,
  tokens = [],
  gridWidth = 20,
  gridHeight = 20,
  showGrid = false, // Default to hidden
  isDisplayMode = false,
  zoomLevel = 1.0,
  onZoomChange,
  onFocusChange,
}) => {
  // Initialize state with empty arrays and load from storage if needed
  const [localTokens, setLocalTokens] = useState<GridToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [isInMoveMode, setIsInMoveMode] = useState(false);
  const [movementRange, setMovementRange] = useState(6); // Default 30ft (6 squares)
  const [focusedTile, setFocusedTile] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [localGridWidth, setLocalGridWidth] = useState(gridWidth);
  const [localGridHeight, setLocalGridHeight] = useState(gridHeight);
  const [localShowGrid, setLocalShowGrid] = useState(showGrid);
  const [localZoomLevel, setLocalZoomLevel] = useState(zoomLevel);
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    undefined
  );
  const [isLoaded, setIsLoaded] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();
  const toast = useToast();

  // Helper function to calculate if a tile is within movement range
  const isWithinMovementRange = (
    targetX: number,
    targetY: number,
    tokenX: number,
    tokenY: number,
    range: number
  ): boolean => {
    const distance = Math.abs(targetX - tokenX) + Math.abs(targetY - tokenY);
    return distance <= range;
  };

  // Helper function to get selected token position
  const getSelectedTokenPosition = (): { x: number; y: number } | null => {
    if (!selectedToken) return null;
    const token = localTokens.find((t) => t.id === selectedToken);
    return token ? { x: token.gridX, y: token.gridY } : null;
  };

  // Load from storage on mount
  useEffect(() => {
    const initializeComponent = async () => {
      if (tokens.length > 0) {
        setLocalTokens(tokens);
        setLocalGridWidth(gridWidth);
        setLocalGridHeight(gridHeight);
        setLocalShowGrid(showGrid);
      } else {
        const storedData = loadBattleMapFromStorage();
        setLocalTokens([]);
        setLocalGridWidth(storedData.gridWidth);
        setLocalGridHeight(storedData.gridHeight);
        setLocalShowGrid(storedData.showGrid);
        setBackgroundImage(storedData.backgroundImage);
      }
      setIsLoaded(true);
    };

    initializeComponent();
  }, []); // Only run on mount

  // Separate effect to update when props change
  useEffect(() => {
    if (isLoaded && tokens.length > 0) {
      setLocalTokens(tokens);
    }
  }, [tokens, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setLocalGridWidth(gridWidth);
    }
  }, [gridWidth, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setLocalGridHeight(gridHeight);
    }
  }, [gridHeight, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setLocalShowGrid(showGrid);
    }
  }, [showGrid, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setLocalZoomLevel(zoomLevel);
    }
  }, [zoomLevel, isLoaded]);

  // Handle keyboard shortcuts for zoom
  useEffect(() => {
    if (isDisplayMode) return; // Only handle zoom in back office

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "=" || event.key === "+") {
          event.preventDefault();
          const newZoom = Math.min(2.0, localZoomLevel + 0.25);
          setLocalZoomLevel(newZoom);
          onZoomChange?.(newZoom);
        } else if (event.key === "-") {
          event.preventDefault();
          const newZoom = Math.max(0.5, localZoomLevel - 0.25);
          setLocalZoomLevel(newZoom);
          onZoomChange?.(newZoom);
        } else if (event.key === "0") {
          event.preventDefault();
          setLocalZoomLevel(1.0);
          onZoomChange?.(1.0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [localZoomLevel, onZoomChange, isDisplayMode]);

  // Send movement state updates immediately to popup
  useEffect(() => {
    if (!isLoaded) return;

    onBattleMapUpdate?.(
      localTokens,
      localGridWidth,
      localGridHeight,
      localShowGrid,
      localZoomLevel,
      focusedTile,
      selectedToken,
      isInMoveMode,
      movementRange
    );
  }, [
    selectedToken,
    isInMoveMode,
    movementRange,
    isLoaded,
    onBattleMapUpdate,
    localTokens,
    localGridWidth,
    localGridHeight,
    localShowGrid,
    localZoomLevel,
    focusedTile,
  ]);

  const handleTokensUpdate = useCallback(
    (newTokens: GridToken[]) => {
      if (!isLoaded) return; // Don't update storage until component is fully loaded

      setLocalTokens(newTokens);

      // For storage, we'll only save basic position data and metadata
      // File objects can't be properly serialized/deserialized
      const storageTokens = newTokens.map((token) => ({
        id: token.id,
        gridX: token.gridX,
        gridY: token.gridY,
        imageName: token.imageFile.file.name, // Just store the name for reference
      }));

      const battleMapData = {
        tokens: storageTokens,
        gridWidth: localGridWidth,
        gridHeight: localGridHeight,
        showGrid: localShowGrid,
        backgroundImage: backgroundImage,
      };

      // Only save to storage if we have valid data
      if (
        storageTokens.length > 0 ||
        localGridWidth !== 20 ||
        localGridHeight !== 20 ||
        !localShowGrid ||
        backgroundImage
      ) {
        saveBattleMapToStorage(battleMapData);
      }

      onBattleMapUpdate?.(
        newTokens,
        localGridWidth,
        localGridHeight,
        localShowGrid,
        localZoomLevel,
        focusedTile,
        selectedToken,
        isInMoveMode,
        movementRange
      );
    },
    [
      onBattleMapUpdate,
      localGridWidth,
      localGridHeight,
      localShowGrid,
      localZoomLevel,
      focusedTile,
      selectedToken,
      isInMoveMode,
      movementRange,
      isLoaded,
      backgroundImage,
    ]
  );

  const handleSettingsChange = useCallback(
    (newGridWidth: number, newGridHeight: number, newShowGrid: boolean) => {
      setLocalGridWidth(newGridWidth);
      setLocalGridHeight(newGridHeight);
      setLocalShowGrid(newShowGrid);

      // Update storage and notify parent
      const storageTokens = localTokens.map((token) => ({
        id: token.id,
        gridX: token.gridX,
        gridY: token.gridY,
        imageName: token.imageFile.file.name,
      }));

      const battleMapData = {
        tokens: storageTokens,
        gridWidth: newGridWidth,
        gridHeight: newGridHeight,
        showGrid: newShowGrid,
        backgroundImage: backgroundImage,
      };

      saveBattleMapToStorage(battleMapData);
      onBattleMapUpdate?.(
        localTokens,
        newGridWidth,
        newGridHeight,
        newShowGrid,
        localZoomLevel,
        focusedTile,
        selectedToken,
        isInMoveMode,
        movementRange
      );
    },
    [
      localTokens,
      onBattleMapUpdate,
      localZoomLevel,
      focusedTile,
      selectedToken,
      isInMoveMode,
      movementRange,
      backgroundImage,
    ]
  );

  const applySettings = () => {
    handleSettingsChange(localGridWidth, localGridHeight, localShowGrid);
    onSettingsClose();

    toast({
      title: "Grid size updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleBackgroundImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBackgroundImage(base64String);

        // Update storage immediately
        const storageTokens = localTokens.map((token) => ({
          id: token.id,
          gridX: token.gridX,
          gridY: token.gridY,
          imageName: token.imageFile.file.name,
        }));

        const battleMapData = {
          tokens: storageTokens,
          gridWidth: localGridWidth,
          gridHeight: localGridHeight,
          showGrid: localShowGrid,
          backgroundImage: base64String,
        };

        saveBattleMapToStorage(battleMapData);

        toast({
          title: "Background image uploaded",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(undefined);

    // Update storage
    const storageTokens = localTokens.map((token) => ({
      id: token.id,
      gridX: token.gridX,
      gridY: token.gridY,
      imageName: token.imageFile.file.name,
    }));

    const battleMapData = {
      tokens: storageTokens,
      gridWidth: localGridWidth,
      gridHeight: localGridHeight,
      showGrid: localShowGrid,
      backgroundImage: undefined,
    };

    saveBattleMapToStorage(battleMapData);

    toast({
      title: "Background image removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const addTokenToGrid = (imageFile: ImageFile, x: number, y: number) => {
    const newToken: GridToken = {
      id: `${imageFile.file.name}-${Date.now()}`,
      imageFile,
      gridX: x,
      gridY: y,
    };

    const updatedTokens = [...localTokens, newToken];
    handleTokensUpdate(updatedTokens);

    toast({
      title: "Token added",
      description: `${parseFilename(imageFile.file.name)} added to grid`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeToken = (tokenId: string) => {
    const updatedTokens = localTokens.filter((token) => token.id !== tokenId);
    handleTokensUpdate(updatedTokens);

    toast({
      title: "Token removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const moveToken = (tokenId: string, newX: number, newY: number) => {
    const updatedTokens = localTokens.map((token) =>
      token.id === tokenId ? { ...token, gridX: newX, gridY: newY } : token
    );
    handleTokensUpdate(updatedTokens);

    // Update focus to the new position when a character is moved
    const newFocusedTile = { x: newX, y: newY };
    setFocusedTile(newFocusedTile);
    onFocusChange?.(newFocusedTile);
  };

  const handleGridClick = (x: number, y: number) => {
    if (isDisplayMode) return;

    // Set focus on the clicked tile
    const newFocusedTile = { x, y };
    setFocusedTile(newFocusedTile);
    onFocusChange?.(newFocusedTile);

    // Check if there's already a token at this position
    const existingToken = localTokens.find(
      (token) => token.gridX === x && token.gridY === y
    );

    if (existingToken) {
      // If clicking on the same selected token, deselect it
      if (selectedToken === existingToken.id) {
        setSelectedToken(null);
        setIsInMoveMode(false);
        return;
      }
      // Otherwise, select this token
      setSelectedToken(existingToken.id);
      setIsInMoveMode(false);
      return;
    }

    // If we're in move mode and have a selected token, move it here if within range
    if (isInMoveMode && selectedToken) {
      const selectedTokenPos = getSelectedTokenPosition();
      if (
        selectedTokenPos &&
        isWithinMovementRange(
          x,
          y,
          selectedTokenPos.x,
          selectedTokenPos.y,
          movementRange
        )
      ) {
        moveToken(selectedToken, x, y);
        setSelectedToken(null);
        setIsInMoveMode(false);
        return;
      } else {
        // Show error if trying to move outside range
        toast({
          title: "Invalid move",
          description: "Target is outside movement range",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
    }

    // If we have a selected token but not in move mode, clear selection
    if (selectedToken) {
      setSelectedToken(null);
      setIsInMoveMode(false);
      return;
    }

    // Otherwise, open the image selector
    onOpen();
    setSelectedPosition({ x, y });
  };

  const [selectedPosition, setSelectedPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const clearAllTokens = () => {
    handleTokensUpdate([]);
    toast({
      title: "All tokens cleared",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const renderGrid = () => {
    const cells = [];
    const selectedTokenPos = getSelectedTokenPosition();

    for (let y = 0; y < localGridHeight; y++) {
      for (let x = 0; x < localGridWidth; x++) {
        const token = localTokens.find((t) => t.gridX === x && t.gridY === y);
        const isSelected = selectedToken === token?.id;
        const isFocused = focusedTile?.x === x && focusedTile?.y === y;
        const isInMovementRange =
          isInMoveMode &&
          selectedTokenPos &&
          !token && // Don't highlight occupied squares
          isWithinMovementRange(
            x,
            y,
            selectedTokenPos.x,
            selectedTokenPos.y,
            movementRange
          );

        cells.push(
          <GridCell
            key={`${x}-${y}`}
            x={x}
            y={y}
            token={token}
            isSelected={isSelected}
            isFocused={isFocused}
            isInMovementRange={isInMovementRange}
            localShowGrid={localShowGrid}
            isDisplayMode={isDisplayMode}
            onGridClick={handleGridClick}
            onRemoveToken={removeToken}
            setSelectedToken={setSelectedToken}
          />
        );
      }
    }
    return cells;
  };

  // Show loading state until component is fully initialized
  if (!isLoaded) {
    return (
      <VStack
        spacing={4}
        width="100%"
        height="100%"
        justify="center"
        align="center"
      >
        <Spinner size="xl" color="teal.500" />
        <Text>Loading Battle Map...</Text>
      </VStack>
    );
  }

  return (
    <VStack spacing={4} width="100%" height="100%">
      {!isDisplayMode && (
        <HStack spacing={4} width="100%" justifyContent="space-between">
          <HStack spacing={2}>
            <Tooltip label="Grid settings">
              <IconButton
                aria-label="Grid settings"
                icon={<SettingsIcon />}
                onClick={onSettingsOpen}
                colorScheme="teal"
              />
            </Tooltip>
            <Text fontSize="lg" fontWeight="bold">
              Battle Map ({localGridWidth}x{localGridHeight})
            </Text>
          </HStack>
          <HStack spacing={4}>
            {/* Zoom Controls */}
            <HStack spacing={2} bg="gray.700" p={2} borderRadius="md">
              <IconButton
                aria-label="Zoom out"
                icon={<MinusIcon />}
                size="sm"
                onClick={() => {
                  const newZoom = Math.max(0.5, localZoomLevel - 0.25);
                  setLocalZoomLevel(newZoom);
                  onZoomChange?.(newZoom);
                }}
                isDisabled={localZoomLevel <= 0.5}
                colorScheme="gray"
                variant="outline"
              />
              <Text
                color="white"
                fontSize="sm"
                minW="60px"
                textAlign="center"
                cursor="pointer"
                onClick={() => {
                  setLocalZoomLevel(1.0);
                  onZoomChange?.(1.0);
                }}
                _hover={{ color: "blue.300" }}
                title="Click to reset zoom (Ctrl+0)"
              >
                {Math.round(localZoomLevel * 100)}%
              </Text>
              <IconButton
                aria-label="Zoom in"
                icon={<AddIcon />}
                size="sm"
                onClick={() => {
                  const newZoom = Math.min(2.0, localZoomLevel + 0.25);
                  setLocalZoomLevel(newZoom);
                  onZoomChange?.(newZoom);
                }}
                isDisabled={localZoomLevel >= 2.0}
                colorScheme="gray"
                variant="outline"
              />
            </HStack>
            <HStack spacing={2}>
              <Button
                leftIcon={<GridOnIcon />}
                onClick={() => {
                  const newShowBattleMap = !localShowGrid;
                  handleSettingsChange(
                    localGridWidth,
                    localGridHeight,
                    newShowBattleMap
                  );
                }}
                colorScheme={localShowGrid ? "orange" : "blue"}
                size="sm"
              >
                {localShowGrid ? "Hide Battle Map" : "Show Battle Map"}
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                onClick={clearAllTokens}
                colorScheme="red"
                size="sm"
                isDisabled={localTokens.length === 0}
              >
                Clear All
              </Button>
              <Button
                leftIcon={<ImageIcon />}
                onClick={() => {
                  const fileInput = document.createElement("input");
                  fileInput.type = "file";
                  fileInput.accept = "image/*";
                  fileInput.onchange = (e) =>
                    handleBackgroundImageUpload(e as any);
                  fileInput.click();
                }}
                colorScheme={backgroundImage ? "green" : "gray"}
                size="sm"
              >
                {backgroundImage ? "Change BG" : "Upload BG"}
              </Button>
              {backgroundImage && (
                <Button
                  leftIcon={<DeleteIcon />}
                  onClick={removeBackgroundImage}
                  colorScheme="red"
                  variant="outline"
                  size="sm"
                >
                  Remove BG
                </Button>
              )}
            </HStack>
          </HStack>
        </HStack>
      )}

      <Box
        width="100%"
        height="100%"
        maxHeight={isDisplayMode ? "100vh" : "70vh"}
        overflowX="auto"
        overflowY="auto"
        bg="gray.800"
        p={2}
      >
        <Grid
          templateColumns={`repeat(${localGridWidth}, 1fr)`}
          templateRows={`repeat(${localGridHeight}, 1fr)`}
          gap={0}
          width={`${localGridWidth * 40}px`}
          height={`${localGridHeight * 40}px`}
          minWidth="100%"
          minHeight="100%"
          position="relative"
        >
          {/* Background image positioned to exactly fit the grid */}
          {backgroundImage && (
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="1"
            >
              <Image
                src={backgroundImage}
                alt="Battle map background"
                width="100%"
                height="100%"
                objectFit="fill" // Force the image to exactly fit the grid dimensions
                style={{
                  imageRendering: "auto", // Ensure smooth scaling
                }}
              />
            </Box>
          )}
          {renderGrid()}
        </Grid>
      </Box>

      {selectedToken && !isDisplayMode && (
        <Box
          position="fixed"
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          bg="gray.700"
          p={4}
          borderRadius="md"
          border="1px solid"
          borderColor="gray.600"
          zIndex={10}
          minWidth="300px"
        >
          <VStack spacing={3} align="center">
            <Text fontSize="sm" color="white" textAlign="center">
              {(() => {
                const token = localTokens.find((t) => t.id === selectedToken);
                return token
                  ? parseFilename(token.imageFile.file.name)
                  : "Token";
              })()}{" "}
              selected
            </Text>

            {isInMoveMode && (
              <VStack spacing={2} align="center">
                <Text fontSize="xs" color="green.200">
                  Move Mode Active - Range: {movementRange * 5}ft
                </Text>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Decrease range"
                    icon={<MinusIcon />}
                    size="xs"
                    onClick={() =>
                      setMovementRange(Math.max(1, movementRange - 1))
                    }
                    isDisabled={movementRange <= 1}
                  />
                  <Text
                    fontSize="xs"
                    color="white"
                    minW="40px"
                    textAlign="center"
                  >
                    {movementRange * 5}ft
                  </Text>
                  <IconButton
                    aria-label="Increase range"
                    icon={<AddIcon />}
                    size="xs"
                    onClick={() =>
                      setMovementRange(Math.min(12, movementRange + 1))
                    }
                    isDisabled={movementRange >= 12}
                  />
                </HStack>
              </VStack>
            )}

            <HStack spacing={2} width="100%">
              <Button
                leftIcon={<DirectionsWalkIcon />}
                size="sm"
                colorScheme={isInMoveMode ? "green" : "blue"}
                onClick={() => setIsInMoveMode(!isInMoveMode)}
                flex={1}
              >
                {isInMoveMode ? "Exit Move" : "Move"}
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                size="sm"
                colorScheme="red"
                onClick={() => {
                  if (selectedToken) {
                    removeToken(selectedToken);
                    setSelectedToken(null);
                    setIsInMoveMode(false);
                  }
                }}
                flex={1}
              >
                Delete
              </Button>
            </HStack>

            <Button
              size="sm"
              onClick={() => {
                setSelectedToken(null);
                setIsInMoveMode(false);
              }}
              width="100%"
              variant="outline"
            >
              Cancel
            </Button>
          </VStack>
        </Box>
      )}

      {/* Image Selection Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>
            Select an Image for Grid Position ({selectedPosition.x},{" "}
            {selectedPosition.y})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(() => {
              // Filter out location images - only show character portraits
              const portraitImages = droppedImages.filter(
                (img) => !img.file.name.toLowerCase().includes("location")
              );

              if (portraitImages.length === 0) {
                return (
                  <Text>
                    No character portraits available. Please upload some
                    character images first.
                  </Text>
                );
              }

              return (
                <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={4}>
                  {portraitImages.map((image, index) => (
                    <VStack
                      key={index}
                      p={3}
                      border="1px solid"
                      borderColor="gray.600"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ borderColor: "blue.400", bg: "gray.700" }}
                      onClick={() => {
                        addTokenToGrid(
                          image,
                          selectedPosition.x,
                          selectedPosition.y
                        );
                        onClose();
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={parseFilename(image.file.name)}
                        boxSize="80px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Text fontSize="xs" textAlign="center" noOfLines={2}>
                        {parseFilename(image.file.name)}
                      </Text>
                    </VStack>
                  ))}
                </SimpleGrid>
              );
            })()}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Settings Modal */}
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>Battle Map Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Grid Width</FormLabel>
                <NumberInput
                  value={localGridWidth}
                  onChange={(valueString) =>
                    setLocalGridWidth(parseInt(valueString) || 20)
                  }
                  min={5}
                  max={50}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Grid Height</FormLabel>
                <NumberInput
                  value={localGridHeight}
                  onChange={(valueString) =>
                    setLocalGridHeight(parseInt(valueString) || 20)
                  }
                  min={5}
                  max={50}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Background Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundImageUpload}
                />
                {backgroundImage && (
                  <HStack spacing={2} mt={2}>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={removeBackgroundImage}
                    >
                      Remove Background Image
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => {
                        // Open the image in a new tab
                        const newTab = window.open();
                        if (newTab) {
                          newTab.close(); // Close the empty tab
                          setTimeout(() => {
                            newTab.location.href = backgroundImage;
                          }, 100);
                        }
                      }}
                    >
                      View Background Image
                    </Button>
                  </HStack>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Show Grid</FormLabel>
                <Switch
                  isChecked={localShowGrid}
                  onChange={(e) => setLocalShowGrid(e.target.checked)}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={applySettings}>
              Apply Settings
            </Button>
            <Button ml={3} onClick={onSettingsClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default BattleMap;
