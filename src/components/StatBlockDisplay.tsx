import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  IconButton,
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
import {
  calculateStatModifier,
  rollD20,
  toastARoll,
} from "../generics/dndHelpers";
import { D20OutlineIcon } from "../assets/D20OutlineIcon";
import { TwoD20OutlineIcon } from "../assets/TwoD20OutlineIcon";
import RollButtons from "./RollButtons";

type StatBlockDisplayProps = {
  statBlock: statBlock;
  toast: any;
};

export const StatBlockDisplay: React.FC<StatBlockDisplayProps> = ({
  statBlock,
  toast,
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
            {statEmojis[key]} {key}: {statBlock[key]} (+
            {calculateStatModifier(statBlock[key])})
          </Text>
          <RollButtons
            toast={toast}
            modifier={calculateStatModifier(statBlock[key])}
            size="sm"
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};
