import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  statBlock,
  statColors,
  statColorsDark,
  statEmojis,
  stats,
} from "../types/dndTypes";

type StatBlockInputProps = {
  statBlock: statBlock;
  onChange: (stat: keyof statBlock, value: number) => void;
};

export const StatBlockInput: React.FC<StatBlockInputProps> = ({
  statBlock,
  onChange,
}) => {
  return (
    <SimpleGrid columns={3} spacing={4}>
      {Object.entries(stats).map(([key, label]) => (
        <FormControl key={key} mt={4}>
          <FormLabel>
            {statEmojis[key]} {label}
          </FormLabel>
          <NumberInput
            value={statBlock[key]}
            onChange={(_, value) => onChange(key as keyof statBlock, value)}
            min={0}
          >
            <NumberInputField backgroundColor={statColorsDark[key]} />
          </NumberInput>
        </FormControl>
      ))}
    </SimpleGrid>
  );
};
