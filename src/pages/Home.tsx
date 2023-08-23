import { Box, HStack, Heading, VStack } from "@chakra-ui/react";
import FileDropper from "./FileDropper";
import ImageDropper from "./ImageDropper";
import ScoreInput from "./ScoreInput";
import { useEffect, useState } from "react";

export default function Home2() {
    const [scores, setScores] = useState([]); // An array to hold the scores
    const [popupWindow, setPopupWindow] = useState(null);
    const [src, setSrc] = useState(null)


const handlePopup = () => {
    const win = window.open("/popup", "_blank", "toolbar=no,location=no,status=no,menubar=no");
    setPopupWindow(win);
};

useEffect(() => {
    if (popupWindow) {
        // Now, every time scores or the selectedImage changes, send the data to the popup
        const message = {
            type: "DATA_UPDATE",
            data: { scores, src }
        };
        popupWindow.postMessage(message, "*");
    }
}, [scores, src, popupWindow]);


    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            h="100vh"   // ensure it takes full viewport height
            justifyContent="space-between" // space between main content and the footer
        >
            <VStack spacing={5}>
                <Heading>D&D HELPER</Heading>
    
                <HStack spacing={5} w="100%">
                    <Box flex={1} p={3} overflow="hidden">
                        <FileDropper />
                    </Box>
    
                    <Box flex={1} p={3} overflow="hidden">
                    <ImageDropper setSrc={setSrc} handlePopup={handlePopup} popupRef={popupWindow} />
                    </Box>
                </HStack>
            </VStack>
    
            <Box p={3} mt={5} borderTop="1px solid" borderColor="gray.300"> 
            <ScoreInput scores={scores} setScores={setScores} />
            </Box>
        </Box>
    );
    
}