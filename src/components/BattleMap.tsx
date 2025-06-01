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
} from "@chakra-ui/react";
import GridOnIcon from "@mui/icons-material/GridOn";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
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
    gridSize: number,
    showGrid: boolean
  ) => void;
  tokens?: GridToken[];
  gridSize?: number;
  showGrid?: boolean;
  isDisplayMode?: boolean;
}

interface GridCellProps {
  x: number;
  y: number;
  token?: GridToken;
  isSelected: boolean;
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
  localShowGrid,
  isDisplayMode,
  onGridClick,
  onRemoveToken,
  setSelectedToken,
}) => {
  return (
    <GridItem
      border="1px solid" // Always show grid lines in back office
      borderColor="gray.600"
      bg={isSelected ? "blue.500" : "transparent"}
      position="relative"
      w="100%"
      h="100%"
      cursor={isDisplayMode ? "default" : "pointer"}
      onClick={() => onGridClick(x, y)}
      _hover={isDisplayMode ? {} : { bg: "gray.700" }}
    >
      {token && (
        <Box position="relative" width="100%" height="100%">
          <Image
            src={token.imageFile.src}
            alt={parseFilename(token.imageFile.file.name)}
            width="100%"
            height="100%"
            objectFit="cover"
            draggable={false}
            pointerEvents="none"
          />
          {!isDisplayMode && isSelected && (
            <IconButton
              aria-label="Remove token"
              icon={<DeleteIcon />}
              size="xs"
              colorScheme="red"
              position="absolute"
              top="2px"
              right="2px"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveToken(token.id);
                setSelectedToken(null);
              }}
            />
          )}
        </Box>
      )}
    </GridItem>
  );
};

const BattleMap: React.FC<BattleMapProps> = ({
  droppedImages,
  onBattleMapUpdate,
  tokens = [],
  gridSize = 20,
  showGrid = false, // Default to hidden
  isDisplayMode = false,
}) => {
  // Initialize state with empty arrays and load from storage if needed
  const [localTokens, setLocalTokens] = useState<GridToken[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [localGridSize, setLocalGridSize] = useState(gridSize);
  const [localShowGrid, setLocalShowGrid] = useState(showGrid);
  const [isLoaded, setIsLoaded] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();
  const toast = useToast();

  // Load from storage on mount
  useEffect(() => {
    const initializeComponent = async () => {
      if (tokens.length > 0) {
        setLocalTokens(tokens);
        setLocalGridSize(gridSize);
        setLocalShowGrid(showGrid);
      } else {
        const storedData = loadBattleMapFromStorage();
        // For now, we'll start with empty tokens if loading from storage
        // since we can't properly recreate File objects from localStorage
        setLocalTokens([]);
        setLocalGridSize(storedData.gridSize);
        setLocalShowGrid(storedData.showGrid);
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
      setLocalGridSize(gridSize);
    }
  }, [gridSize, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setLocalShowGrid(showGrid);
    }
  }, [showGrid, isLoaded]);

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
        gridSize: localGridSize,
        showGrid: localShowGrid,
      };

      // Only save to storage if we have valid data
      if (storageTokens.length > 0 || localGridSize !== 20 || !localShowGrid) {
        saveBattleMapToStorage(battleMapData);
      }

      onBattleMapUpdate?.(newTokens, localGridSize, localShowGrid);
    },
    [onBattleMapUpdate, localGridSize, localShowGrid, isLoaded]
  );

  const handleSettingsChange = useCallback(
    (newGridSize: number, newShowGrid: boolean) => {
      setLocalGridSize(newGridSize);
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
        gridSize: newGridSize,
        showGrid: newShowGrid,
      };

      saveBattleMapToStorage(battleMapData);
      onBattleMapUpdate?.(localTokens, newGridSize, newShowGrid);
    },
    [localTokens, onBattleMapUpdate]
  );

  const applySettings = () => {
    handleSettingsChange(localGridSize, localShowGrid);
    onSettingsClose();

    toast({
      title: "Grid size updated",
      status: "success",
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
  };

  const handleGridClick = (x: number, y: number) => {
    if (isDisplayMode) return;

    // Check if there's already a token at this position
    const existingToken = localTokens.find(
      (token) => token.gridX === x && token.gridY === y
    );

    if (existingToken) {
      setSelectedToken(existingToken.id);
      return;
    }

    // If we have a selected token, move it here
    if (selectedToken) {
      moveToken(selectedToken, x, y);
      setSelectedToken(null);
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
    for (let y = 0; y < localGridSize; y++) {
      for (let x = 0; x < localGridSize; x++) {
        const token = localTokens.find((t) => t.gridX === x && t.gridY === y);
        const isSelected = selectedToken === token?.id;

        cells.push(
          <GridCell
            key={`${x}-${y}`}
            x={x}
            y={y}
            token={token}
            isSelected={isSelected}
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
              Battle Map ({localGridSize}x{localGridSize})
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Button
              leftIcon={<GridOnIcon />}
              onClick={() => {
                const newShowBattleMap = !localShowGrid;
                handleSettingsChange(localGridSize, newShowBattleMap);
              }}
              colorScheme={localShowGrid ? "green" : "gray"}
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
          templateColumns={`repeat(${localGridSize}, 1fr)`}
          templateRows={`repeat(${localGridSize}, 1fr)`}
          gap={0}
          width={`${localGridSize * 40}px`}
          height={`${localGridSize * 40}px`}
          minWidth="100%"
          minHeight="100%"
        >
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
        >
          <Text fontSize="sm" color="white" textAlign="center">
            Token selected. Click on an empty grid cell to move it, or click the
            delete button to remove it.
          </Text>
          <Button
            size="sm"
            mt={2}
            onClick={() => setSelectedToken(null)}
            width="100%"
          >
            Cancel
          </Button>
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
                <FormLabel>Grid Size</FormLabel>
                <NumberInput
                  value={localGridSize}
                  onChange={(valueString) =>
                    setLocalGridSize(parseInt(valueString) || 20)
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
