import React, { useEffect, useState } from 'react';
import {
  VStack, Box, Image, useToast, SimpleGrid, Text
} from '@chakra-ui/react';

const ImageViewer = ({ fileObject, isSelected, onClick }) => (
  <Box
    p={2}
    border={isSelected ? '2px solid blue' : '1px solid gray'}
    onClick={onClick}
    cursor="pointer"
    borderRadius="md"
  >
    <Image
      src={fileObject.src}
      alt={fileObject.file.name}
      boxSize="100px"
      objectFit="cover"
    />
  </Box>
);

const ImageDropper = ({setSelectedPortraits, selectedPortraits, setSelectedLocation, selectedLocation, droppedImages, setDroppedImages}) => {
  const toast = useToast();

  const locationImages = droppedImages.filter(img => img.file.name.includes('location'));
  const portraitImages = droppedImages.filter(img => !img.file.name.includes('location'));

  const handleImageClick = (index, isLocation) => {
    if (isLocation) {
      setSelectedLocation(index);
      return;
    }
    
    if (selectedPortraits.includes(index)) {
      setSelectedPortraits(selectedPortraits.filter(i => i !== index));
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
      onDragOver={e => e.preventDefault()}
      onDrop={e => {
        e.preventDefault();
        const files = [...e.dataTransfer.files].filter(file => file.type.startsWith('image/'));
        if (files.length > 0) {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              setDroppedImages(prev => [...prev, { file, src: reader.result }]);
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
      borderWidth={2}
      borderRadius="md"
      p={4}
      w="100%"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      textAlign="center"
    >
      {droppedImages.length === 0 ? (
        <span>Drop your image files here:</span>
      ) : (
        <>
          {locationImages.length > 0 && (
            <>
              <Text fontSize="xl" mb={4}>Location Images</Text>
              {displayImages(locationImages, true)}
            </>
          )}
          {portraitImages.length > 0 && (
            <>
              <Text fontSize="xl" mt={locationImages.length > 0 ? 8 : 0} mb={4}>Portrait Images</Text>
              {displayImages(portraitImages, false)}
            </>
          )}
        </>
      )}
    </VStack>
  );
};

export default ImageDropper;
