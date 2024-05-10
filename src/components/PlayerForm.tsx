import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { classes, player, statBlock } from "../types/dndTypes";
import { StatBlockInput } from "./StatBlockInput";

type PlayerFormProps = {
  player: player | null;
  onSave: (player: player) => void;
  onDelete: (player: player) => void;
  onCancel: () => void;
};

export const PlayerForm: React.FC<PlayerFormProps> = ({
  player: initialPlayer,
  onSave,
  onDelete,
  onCancel,
}) => {
  const [player, setPlayer] = useState<player>(
    initialPlayer || {
      name: "",
      class: "BARBARIAN",
      level: 1,
      armorClass: 10,
      speed: 30,
      maxHitPoints: 10,
      stats: {
        STR: 10,
        DEX: 10,
        CON: 10,
        INT: 10,
        WIS: 10,
        CHA: 10,
      },
      isEnabled: true,
    }
  );

  const handleStatChange = (stat: keyof statBlock, value: number) => {
    setPlayer((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: value,
      },
    }));
  };

  const handleSubmit = () => {
    onSave(player);
  };

  return (
    <Box p={4}>
      <VStack
        spacing={4}
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={player.name}
            onChange={(e) => setPlayer({ ...player, name: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Class</FormLabel>
          <Select
            value={player.class}
            onChange={(e) =>
              setPlayer({
                ...player,
                class: e.target.value as keyof typeof classes,
              })
            }
          >
            {Object.entries(classes).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Level</FormLabel>
          <Input
            type="number"
            value={player.level}
            min={1}
            onChange={(e) =>
              setPlayer({ ...player, level: parseInt(e.target.value, 10) || 1 })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Armor Class</FormLabel>
          <Input
            type="number"
            value={player.armorClass}
            min={0}
            onChange={(e) =>
              setPlayer({
                ...player,
                armorClass: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Speed</FormLabel>
          <Input
            type="number"
            value={player.speed}
            min={0}
            onChange={(e) =>
              setPlayer({
                ...player,
                speed: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Max Hit Points</FormLabel>
          <Input
            type="number"
            value={player.maxHitPoints}
            min={0}
            onChange={(e) =>
              setPlayer({
                ...player,
                maxHitPoints: parseInt(e.target.value, 10) || 0,
              })
            }
          />
        </FormControl>

        <StatBlockInput statBlock={player.stats} onChange={handleStatChange} />
        <HStack justifyContent="flex-end" width="100%">
          <Button colorScheme="blue" type="submit">
            Save
          </Button>

          {initialPlayer && (
            <Button colorScheme="red" onClick={() => onDelete(initialPlayer)}>
              Delete
            </Button>
          )}
          <Button colorScheme="pink" onClick={onCancel}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
