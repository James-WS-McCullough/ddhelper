import React, { useEffect, useState } from "react";
import {
  VStack,
  HStack,
  Box,
  Image,
  useToast,
  SimpleGrid,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { parseFilename } from "../generics/parseFilename";

const ImageViewer = ({ fileObject, isSelected, onClick }) => (
  <VStack
    p={2}
    border={isSelected ? "1px solid white" : "1px solid gray"}
    bg={isSelected ? "blue.700" : "transparent"}
    onClick={onClick}
    cursor="pointer"
    borderRadius="md"
    width="150px"
  >
    <Text fontSize="sm">{parseFilename(fileObject.file.name)}</Text>
    <Image
      src={fileObject.src}
      alt={fileObject.file.name}
      boxSize="120px"
      objectFit="cover"
    />
  </VStack>
);

const ImageDropper = ({
  setSelectedPortraits,
  selectedPortraits,
  setSelectedLocation,
  selectedLocation,
  droppedImages,
  setDroppedImages,
  setShowNames,
  showNames,
  droppedVideos,
  setDroppedVideos,
  playVideo,
  clearVideo,
  currentlyPlayingVideo,
  blackOverlay,
  setBlackOverlay,
}) => {
  const toast = useToast();

  const locationImages = droppedImages.filter((img) =>
    img.file.name.includes("location")
  );
  const portraitImages = droppedImages.filter(
    (img) => !img.file.name.includes("location")
  );

  const eventVideos = droppedVideos.filter((video) => !video.isBackground);
  const backgroundVideos = droppedVideos.filter((video) => video.isBackground);

  const handleImageClick = (index, isLocation) => {
    if (isLocation) {
      setSelectedLocation(index);
      return;
    }

    if (selectedPortraits.includes(index)) {
      setSelectedPortraits(selectedPortraits.filter((i) => i !== index));
    } else {
      setSelectedPortraits([...selectedPortraits, index]);
    }
  };

  const isImageSelected = (index, isLocation) => {
    if (isLocation) {
      return index === selectedLocation;
    }
    return selectedPortraits.includes(index);
  };

  const displayImages = (images, isLocation) => (
    <SimpleGrid columns={3} spacing={4}>
      {images.map((fileObject, index) => (
        <ImageViewer
          key={index}
          fileObject={fileObject}
          isSelected={isImageSelected(index, isLocation)}
          onClick={() => handleImageClick(index, isLocation)}
        />
      ))}
    </SimpleGrid>
  );

  const displayVideos = (videos) => (
    <SimpleGrid columns={3} spacing={4}>
      {videos.map((fileObject, index) => (
        <VStack
          p={2}
          border="1px solid gray"
          bg="transparent"
          cursor="pointer"
          borderRadius="md"
          width="150px"
          onClick={() => playVideo(fileObject.file.name)}
        >
          <Text fontSize="sm">{parseFilename(fileObject.file.name)}</Text>
          <Image
            src={fileObject.thumbnail}
            alt={fileObject.file.name}
            boxSize="120px"
            objectFit="cover"
          />
        </VStack>
      ))}
    </SimpleGrid>
  );

  return (
    <VStack
      spacing={5}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const files = [...e.dataTransfer.files].filter(
          (file) =>
            file.type.startsWith("image/") || file.type.startsWith("video/")
        );

        if (files.length > 0) {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (file.type.startsWith("image/")) {
                setDroppedImages((prev) => [
                  ...prev,
                  { file, src: reader.result },
                ]);
              } else if (file.type.startsWith("video/")) {
                const video = document.createElement("video");
                const videoUrl = URL.createObjectURL(file);
                video.src = videoUrl;
                video.currentTime = 1;
                video.addEventListener("loadeddata", () => {
                  const canvas = document.createElement("canvas");
                  canvas.width = 150; // thumbnail width
                  canvas.height = 100; // thumbnail height
                  const ctx = canvas.getContext("2d");
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
                });
              }
            };
            reader.readAsDataURL(file);
          });
        } else {
          toast({
            title: "No valid files found",
            description: "Please drop valid image or video files.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }}
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
      h={droppedImages.length === 0 ? "100%" : "auto"}
    >
      {droppedImages.length === 0 ? (
        <Text fontSize="xl">Drop your image files here!</Text>
      ) : (
        <>
          <VStack>
            <Text fontSize="xl">General</Text>
            <HStack>
              <Button
                ml={4}
                onClick={() => setShowNames(!showNames)}
                colorScheme={showNames ? "red" : "green"}
              >
                {showNames ? "Hide Names" : "Show Names"}
              </Button>
              <Button
                ml={4}
                onClick={() => setBlackOverlay(!blackOverlay)}
                colorScheme={blackOverlay ? "green" : "red"}
              >
                {blackOverlay ? "Reveal All" : "Hide All"}
              </Button>
              <Button
                ml={4}
                onClick={() => {
                  setSelectedLocation(null);
                  setSelectedPortraits([]);
                  clearVideo();
                }}
                colorScheme="red"
              >
                Clear All
              </Button>
            </HStack>
          </VStack>
          {locationImages.length > 0 && (
            <>
              <Text fontSize="xl">Location Images</Text>
              <Button
                onClick={() => setSelectedLocation(null)}
                colorScheme="red"
                isDisabled={selectedLocation === null}
              >
                Clear
              </Button>
              {displayImages(locationImages, true)}
            </>
          )}
          {portraitImages.length > 0 && (
            <>
              <Text fontSize="xl" mt={locationImages.length > 0 ? 8 : 0}>
                Portrait Images
              </Text>
              <Button
                mb={4}
                onClick={() => setSelectedPortraits([])}
                colorScheme="red"
                isDisabled={selectedPortraits.length === 0}
              >
                Clear
              </Button>
              {displayImages(portraitImages, false)}
            </>
          )}
          {backgroundVideos.length > 0 && (
            <>
              <Text fontSize="xl" mt={8}>
                Video Backgrounds
              </Text>
              {currentlyPlayingVideo && (
                <Button
                  mb={4}
                  onClick={clearVideo}
                  colorScheme="red"
                  isDisabled={backgroundVideos.length === 0}
                >
                  Clear
                </Button>
              )}
              {displayVideos(backgroundVideos)}
            </>
          )}
          {eventVideos.length > 0 && (
            <>
              <Text fontSize="xl" mt={8}>
                Event Videos
              </Text>
              <Button
                mb={4}
                onClick={clearVideo}
                colorScheme="red"
                isDisabled={backgroundVideos.length === 0}
              >
                Clear
              </Button>
              {displayVideos(eventVideos)}
            </>
          )}
        </>
      )}
    </VStack>
  );
};

export default ImageDropper;
