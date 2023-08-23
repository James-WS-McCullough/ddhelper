import React, { useEffect, useRef, useState } from 'react';
import {
  VStack, Box, Image, useToast, SimpleGrid,
  Modal, ModalOverlay, ModalContent, ModalCloseButton, Button
} from '@chakra-ui/react';

const ImageViewer = ({ fileObject, isSelected, onClick }) => {
  return (
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
};

const ImageDropper = () => {
  const [droppedImages, setDroppedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files].filter(file =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDroppedImages(prevState => [...prevState, {
            file, src: reader.result
          }]);
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
  };

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const popupRef = useRef(null);

  const handleOpenPopup = () => {
    if (selectedImage !== null) {
      localStorage.setItem('selectedImageSrc', droppedImages[selectedImage].src);
  
      // Check if the popup is already open, otherwise create it
      if (!popupRef.current || popupRef.current.closed) {
        popupRef.current = window.open("/popup", "Image Viewer", "width=600,height=400");
      }
    } else {
      alert("Please select an image first");
    }
  };

  useEffect(() => {
    if (popupRef.current && !popupRef.current.closed && selectedImage !== null) {
      const newSrc = droppedImages[selectedImage].src;
      popupRef.current.postMessage({ src: newSrc }, "*");
    }
  }, [selectedImage]);
  

  // useEffect(() => {
  //   if (popupRef.current) {
  //     popupRef.current.addEventListener('beforeunload', () => {
  //       popupRef.current = null;
  //     });
  //   }
  // }, []);

  const listDroppedImages = () => (
    <SimpleGrid columns={3} spacing={4}>
      {droppedImages.map((fileObject, index) => (
        <ImageViewer 
          key={index} 
          fileObject={fileObject}
          isSelected={index === selectedImage}
          onClick={() => handleImageClick(index)}
        />
      ))}
    </SimpleGrid>
  );

  return (
    <VStack
      spacing={5}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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
       <Button onClick={handleOpenPopup}>View Selected Image in Popup</Button>

      {droppedImages.length === 0 ? (
        <span>Drop your image files here:</span>
      ) : listDroppedImages()}

      {/* Modal code */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl" isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent maxW="90%" m="1.5rem auto" bg="transparent" boxShadow="none">
          {selectedImage !== null && (
            <Image
              src={droppedImages[selectedImage].src}
              alt={droppedImages[selectedImage].file.name}
              maxW="100%"
              maxH="80vh"
              objectFit="contain"
            />
          )}
          <ModalCloseButton color="white" mt={4} />
        </ModalContent>
      </Modal>

    </VStack>
  );
};

export default ImageDropper;
