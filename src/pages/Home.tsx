import { Box, HStack, Heading } from "@chakra-ui/react";
import FileDropper from "./FileDropper";
import ImageDropper from "./ImageDropper";

export default function Home2() {
    return (
        <Box>
            <Heading>D&D HELPER</Heading>
            <Box h={10}></Box>
            <HStack>
                <Box flex={1}>
                <FileDropper />
                </Box>
                <Box flex={1}>
                <ImageDropper />
                </Box>
            </HStack>
        </Box>
    )
}