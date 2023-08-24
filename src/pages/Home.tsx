import { Box, Button, HStack, Heading, VStack } from "@chakra-ui/react";
import FileDropper from "./FileDropper";
import ImageDropper from "./ImageDropper";
import ScoreInput from "./ScoreInput";
import { useEffect, useState } from "react";

export default function Home2() {
    const [scores, setScores] = useState([]); // An array to hold the scores
    const [popupWindow, setPopupWindow] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedPortraits, setSelectedPortraits] = useState([]);
    const [droppedImages, setDroppedImages] = useState([]);


    const handlePopup = () => {
        if (!popupWindow || popupWindow.closed) {
            const win = window.open("/popup", "_blank", "toolbar=no,location=no,status=no,menubar=no");
            setPopupWindow(win);
            setSelectedLocation(null)
            setSelectedPortraits([])
        }
    };
    

    useEffect(() => {
        if (popupWindow) {
            // Prepare the image sources
            const locationImages = droppedImages.filter(img => img.file.name.includes('location'));
            const portraitImages = droppedImages.filter(img => !img.file.name.includes('location'));

            const locationSrc = selectedLocation !== null ? locationImages[selectedLocation].src : null;
            const portraitsSrcs = selectedPortraits.map(index => portraitImages[index].src);
    
            // Now, every time scores, location, or portrait selections change, send the data to the popup
            const message = {
                type: "DATA_UPDATE",
                data: {
                    scores,
                    locationSrc,
                    portraitsSrcs
                }
            };
            popupWindow.postMessage(message, "*");
        }
    }, [scores, selectedLocation, selectedPortraits, popupWindow]);
    


    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            h="100vh"   // ensure it takes full viewport height
            justifyContent="space-between" // space between main content and the footer
        >
            <VStack spacing={5}>
                <Heading>D&D HELPER</Heading>
                <HStack>
                <Button onClick={handlePopup}>Open Popup</Button>
                </HStack>
                <HStack spacing={5} w="100%">
                    <Box flex={1} p={3} overflow="hidden">
                        <FileDropper />
                    </Box>
    
                    <Box flex={1} p={3} overflow="hidden">
                    <ImageDropper selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}  selectedPortraits={selectedPortraits} setSelectedPortraits={setSelectedPortraits} droppedImages={droppedImages} setDroppedImages={setDroppedImages} />
                    </Box>
                </HStack>
            </VStack>
    
            <Box p={3} mt={5} borderTop="1px solid" borderColor="gray.300"> 
            <ScoreInput scores={scores} setScores={setScores} />
            </Box>
        </Box>
    );
    
}