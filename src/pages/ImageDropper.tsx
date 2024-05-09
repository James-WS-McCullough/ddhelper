import React, { useEffect, useState } from "react";
import {
  VStack,
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
}) => {
  const toast = useToast();

  const locationImages = droppedImages.filter((img) =>
    img.file.name.includes("location")
  );
  const portraitImages = droppedImages.filter(
    (img) => !img.file.name.includes("location")
  );

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

  return (
    <VStack
      spacing={5}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const files = [...e.dataTransfer.files].filter((file) =>
          file.type.startsWith("image/")
        );
        if (files.length > 0) {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              setDroppedImages((prev) => [
                ...prev,
                { file, src: reader.result },
              ]);
            };
            reader.readAsDataURL(file);
          });
        } else {
          toast({
            title: "No image files found",
            description: "Please drop valid image files.",
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
        </>
      )}
    </VStack>
  );
};

export default ImageDropper;
