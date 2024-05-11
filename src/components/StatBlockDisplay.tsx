import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  statBlock,
  statColors,
  statColorsDark,
  statEmojis,
  stats,
} from "../types/dndTypes";

type StatBlockDisplayProps = {
  statBlock: statBlock;
};

export const StatBlockDisplay: React.FC<StatBlockDisplayProps> = ({
  statBlock,
}) => {
  return (
    <SimpleGrid
      columns={3}
      spacing={3}
      width="fit-content"
      borderRadius="md"
      borderWidth={1}
      padding={2}
      borderColor="gray.400"
    >
      {Object.entries(stats).map(([key, label]) => (
        <Box
          key={key}
          p={2}
          bg={statColorsDark[key]}
          borderRadius="md"
          borderWidth={1}
          padding={2}
          borderColor={statColors[key]}
        >
          <Text fontWeight="bold">
            {statEmojis[key]} {key}: {statBlock[key]}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};
