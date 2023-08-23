import { Box, Text } from "@chakra-ui/react";

const ScoreBox = ({ color }) => (
  <Box bg={color} w="30px" h="30px" m={1} borderRadius="5px"></Box>
);

const ScoreDisplay = ({ name, successes, failures }) => {
  return (
    <Box position="absolute" top={5} left={5} zIndex={10}>
      <Text fontSize="xl" fontWeight="bold">{name}</Text>
      <Box display="flex">
        {[...Array(3 - failures)].map((_, idx) => (
          <ScoreBox key={`empty-failure-${idx}`} color="transparent" />
        ))}
        {[...Array(failures)].map((_, idx) => (
          <ScoreBox key={`failure-${idx}`} color="red.500" />
        ))}
        {[...Array(successes)].map((_, idx) => (
          <ScoreBox key={`success-${idx}`} color="green.500" />
        ))}
        {[...Array(3 - successes)].map((_, idx) => (
          <ScoreBox key={`empty-success-${idx}`} color="transparent" />
        ))}
      </Box>
    </Box>
  );
};

export default ScoreDisplay;
