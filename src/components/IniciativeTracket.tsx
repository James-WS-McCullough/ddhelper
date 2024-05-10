import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  NumberInput,
  NumberInputField,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// Define TypeScript interfaces for participant and props if necessary
interface Participant {
  id: number;
  name: string;
  initiative: number;
}

const InitiativeTracker: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState<string>("");
  const [newInitiative, setNewInitiative] = useState<string>("");

  const [currentParticipant, setCurrentParticipant] =
    useState<Participant | null>(null);

  const handleAddParticipant = (): void => {
    if (!newParticipant || newInitiative === "") return; // Prevent adding empty values
    const participant: Participant = {
      id: Date.now(), // simple unique identifier
      name: newParticipant,
      initiative: parseInt(newInitiative, 10),
    };
    setParticipants([...participants, participant]);
    setNewParticipant("");
    setNewInitiative("");
  };

  const handleRemoveParticipant = (id: number): void => {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    );
  };

  const updateInitiative = (id: number, value: string): void => {
    setParticipants(
      participants.map((participant) => {
        if (participant.id === id) {
          return { ...participant, initiative: parseInt(value, 10) };
        }
        return participant;
      })
    );
  };

  const handleNextInitiative = (): void => {
    if (!currentParticipant) {
      if (participants.length > 0) {
        setCurrentParticipant(participants[0]);
      }
      return;
    }
    const currentIndex = participants.findIndex(
      (participant) => participant.id === currentParticipant.id
    );
    if (currentIndex === participants.length - 1) {
      setCurrentParticipant(participants[0]);
    } else {
      setCurrentParticipant(participants[currentIndex + 1]);
    }
  };

  const handleClear = (): void => {
    setParticipants([]);
    setCurrentParticipant(null);
  };

  // Sort participants by initiative before rendering
  participants.sort((a, b) => b.initiative - a.initiative);

  return (
    <Box>
      <VStack margin={2}>
        {participants.map((participant) => (
          <HStack
            key={participant.id}
            backgroundColor={
              currentParticipant === participant ? "blue.500" : "blue.800"
            }
            padding={2}
            borderRadius="md"
            border="1px solid"
            justifyContent={"left"}
          >
            <Input
              textAlign="center"
              defaultValue={participant.initiative}
              onChange={(valueString) => {
                if (
                  valueString.target.value !== "" &&
                  !isNaN(parseInt(valueString.target.value, 10))
                ) {
                  updateInitiative(participant.id, valueString.target.value);
                }
              }}
              w="40px" // Update width to 20
              h="40px"
              padding={0}
            />

            <Text
              width={40} // Update width to 40px
              textAlign="start"
            >
              {participant.name}
            </Text>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              aria-label="Remove participant"
              onClick={() => handleRemoveParticipant(participant.id)}
            />
          </HStack>
        ))}
        <HStack>
          <Button colorScheme="green" onClick={handleNextInitiative}>
            Next
          </Button>
          <Button colorScheme="red" onClick={handleClear}>
            Clear
          </Button>
        </HStack>

        <HStack>
          <Input
            placeholder="Name"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
            width={80} // Update width to 40px
          />
          <NumberInput
            value={newInitiative}
            onChange={(valueString) => setNewInitiative(valueString)}
          >
            <NumberInputField placeholder="10" />
          </NumberInput>
          <IconButton
            onClick={handleAddParticipant}
            colorScheme="blue"
            icon={<AddIcon />}
            aria-label="Add participant"
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default InitiativeTracker;
