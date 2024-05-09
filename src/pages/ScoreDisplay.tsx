import { Box, Text } from "@chakra-ui/react";

const ScoreBox = ({ color }) => (
  <Box
    bg={color}
    w="60px"
    h="60px"
    m={1}
    borderRadius="15px"
    borderColor={"white"}
    borderWidth="1px"
  ></Box>
);

const ScoreDisplay = ({ name, successes, failures }) => {
  return (
    <Box
      borderRadius="3px"
      borderColor={"white"}
      borderWidth="1px"
      backgroundColor={"blackAlpha.600"}
      paddingY="20px"
    >
      <Text
        fontSize="5xl"
        fontWeight="bold"
        textAlign={"center"}
        color={failures === 3 ? "red" : successes === 3 ? "green" : "white"}
      >
        {name}
      </Text>
      <Box display="flex" marginX="20px" justifyContent="center">
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
