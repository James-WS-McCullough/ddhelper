import React, { useEffect } from "react";
import { Box, Image, HStack, Text } from "@chakra-ui/react";
import { BattleMapStorage } from "../generics/localStorageHelpers";

interface PopupBattleMapProps {
  battleMapData: BattleMapStorage;
  droppedImages: any[];
  zoomLevel: number;
  focusedTile?: { x: number; y: number } | null;
  selectedToken?: string | null;
  isInMoveMode?: boolean;
  movementRange?: number;
}

const PopupBattleMap: React.FC<PopupBattleMapProps> = ({
  battleMapData,
  droppedImages,
  zoomLevel,
  focusedTile,
  selectedToken,
  isInMoveMode = false,
  movementRange = 6,
}) => {
  // Calculate tile size based on zoom level (minimum 30px, maximum 120px)
  const baseTileSize = 60; // Base size in pixels
  const tileSize = Math.max(30, Math.min(120, baseTileSize * zoomLevel));

  // Calculate grid dimensions
  const gridWidth = tileSize * battleMapData.gridWidth;
  const gridHeight = tileSize * battleMapData.gridHeight;

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
    const token = battleMapData.tokens.find((t) => t.id === selectedToken);
    return token ? { x: token.gridX, y: token.gridY } : null;
  };

  // Ref for the scrollable container
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Handle smooth panning to focused tile
  useEffect(() => {
    if (focusedTile && containerRef.current) {
      const container = containerRef.current;

      // Wait a frame to ensure the grid is rendered
      requestAnimationFrame(() => {
        // Find the actual focused tile element in the DOM
        const tileElements = container.querySelectorAll("[data-tile]");
        const focusedElement = Array.from(tileElements).find((el) => {
          const x = parseInt(el.getAttribute("data-x") || "0");
          const y = parseInt(el.getAttribute("data-y") || "0");
          return x === focusedTile.x && y === focusedTile.y;
        });

        if (focusedElement) {
          // Get the position of the focused tile relative to the container
          const tileRect = focusedElement.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          // Calculate the center of the tile
          const tileCenterX =
            tileRect.left -
            containerRect.left +
            container.scrollLeft +
            tileRect.width / 2;
          const tileCenterY =
            tileRect.top -
            containerRect.top +
            container.scrollTop +
            tileRect.height / 2;

          // Calculate the scroll position needed to center the tile
          const targetScrollX = tileCenterX - containerRect.width / 2;
          const targetScrollY = tileCenterY - containerRect.height / 2;

          // Ensure we don't scroll beyond the content boundaries
          const maxScrollX = Math.max(
            0,
            container.scrollWidth - containerRect.width
          );
          const maxScrollY = Math.max(
            0,
            container.scrollHeight - containerRect.height
          );

          const finalX = Math.max(0, Math.min(maxScrollX, targetScrollX));
          const finalY = Math.max(0, Math.min(maxScrollY, targetScrollY));

          // Smooth scroll to center the focused tile
          container.scrollTo({
            left: finalX,
            top: finalY,
            behavior: "smooth",
          });
        }
      });
    }
  }, [focusedTile]);

  return (
    <Box
      ref={containerRef}
      position="absolute"
      width="100%"
      height="100%"
      top="0"
      left="0"
      zIndex="10"
      bg="gray.800"
      overflow="auto" // Allow scrolling for large grids
    >
      {/* Container for the battle map with adequate padding for scrolling */}
      <Box
        minWidth={`calc(100vw + ${gridWidth}px)`}
        minHeight={`calc(100vh + ${gridHeight}px)`}
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={`calc(50vh) calc(50vw)`} // Provide viewport-sized padding so any tile can be centered
      >
        {/* Battle map display with proper grid positioning */}
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${battleMapData.gridWidth}, ${tileSize}px)`}
          gridTemplateRows={`repeat(${battleMapData.gridHeight}, ${tileSize}px)`}
          width={`${gridWidth}px`}
          height={`${gridHeight}px`}
          position="relative"
          gap="1px"
        >
          {/* Background image positioned to exactly fit the grid */}
          {battleMapData.backgroundImage && (
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              zIndex="1"
            >
              <Image
                src={battleMapData.backgroundImage}
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
          {/* Grid cells */}
          {Array.from({
            length: battleMapData.gridWidth * battleMapData.gridHeight,
          }).map((_, index) => {
            const x = index % battleMapData.gridWidth;
            const y = Math.floor(index / battleMapData.gridWidth);
            const token = battleMapData.tokens.find(
              (t) => t.gridX === x && t.gridY === y
            );

            // Calculate movement range highlighting
            const selectedTokenPos = getSelectedTokenPosition();
            const isSelected = selectedToken === token?.id;
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

            // Determine background color based on state (no focus highlighting in popup)
            let bgColor = "transparent";
            if (isSelected) {
              bgColor = "rgba(59, 130, 246, 0.5)"; // Blue for selected
            } else if (isInMovementRange) {
              bgColor = "rgba(34, 197, 94, 0.3)"; // Green for movement range
            }

            return (
              <Box
                key={`${x}-${y}`}
                data-tile
                data-x={x}
                data-y={y}
                border={
                  isSelected
                    ? "2px solid rgb(59, 130, 246)"
                    : isInMovementRange
                    ? "2px solid rgb(34, 197, 94)"
                    : "1px solid rgba(255,255,255,0.2)"
                }
                position="relative"
                bg={bgColor}
                width={`${tileSize}px`}
                height={`${tileSize}px`}
                transition="all 0.2s ease"
                zIndex="2" // Ensure grid cells appear above the background
              >
                {token && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    width="80%"
                    height="80%"
                    borderRadius="50%"
                    overflow="hidden"
                    border={`${Math.max(2, tileSize * 0.05)}px solid white`}
                    boxShadow="0 0 10px rgba(0,0,0,0.5)"
                    zIndex="3" // Ensure tokens appear above grid cells and background
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translate(-50%, -50%) scale(1.05)",
                      boxShadow: "0 0 15px rgba(255,255,255,0.3)",
                    }}
                  >
                    {(() => {
                      // Find the matching image from droppedImages
                      const matchingImage = droppedImages.find(
                        (img) => img.file.name === token.imageName
                      );

                      if (matchingImage) {
                        return (
                          <Image
                            src={matchingImage.src}
                            alt={token.imageName}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                          />
                        );
                      } else {
                        // Fallback to placeholder if image not found
                        return (
                          <Box
                            width="100%"
                            height="100%"
                            bg="teal.500"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="xs"
                            color="white"
                            fontWeight="bold"
                            textAlign="center"
                          >
                            {token.imageName
                              ? token.imageName
                                  .split(".")[0]
                                  .substring(0, 3)
                                  .toUpperCase()
                              : "TOK"}
                          </Box>
                        );
                      }
                    })()}
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default PopupBattleMap;
