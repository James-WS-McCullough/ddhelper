import { Box, Heading } from "@chakra-ui/react";
import FileDropper from "./FileDropper";

export default function Home2() {
    return (
        <Box>
            <Heading>D&D HELPER</Heading>
            <Box h={10}></Box>
            <FileDropper />
        </Box>
    )
}