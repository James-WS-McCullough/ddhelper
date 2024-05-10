import React, { useEffect, useState } from "react";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  ModalFooter,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { creature, encounter } from "../types/dndTypes";
import {
  loadEncountersFromStorage,
  loadPlayersFromStorage,
} from "../generics/localStorageHelpers";
import DarkModalContent from "./DarkModalContent";
import { calculateStatModifier, rollD20 } from "../generics/dndHelpers";

// Define TypeScript interfaces for participant and props if necessary
interface Participant {
  id: number;
  name: string;
  initiative: number;
  creature?: creature;
}

const InitiativeTracker: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState<string>("");
  const [newInitiative, setNewInitiative] = useState<string>("");
  const [encounters, setEncounters] = useState<encounter[]>([]);
  const [selectedEncounterId, setSelectedEncounterId] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setEncounters(loadEncountersFromStorage());
  }, []);

  const handleAddEncounterParticipants = () => {
    const selectedEncounter = encounters.find(
      (e) => e.id === selectedEncounterId
    );
    if (selectedEncounter) {
      const encounterParticipants = selectedEncounter.monsters.map(
        (monster) => ({
          id: Date.now() + Math.random(), // Ensure unique ID
          name: monster.name,
          initiative: rollD20() + calculateStatModifier(monster.stats.DEX),
          creature: monster,
        })
      );
      setParticipants([...participants, ...encounterParticipants]);
      onClose(); // Close the modal after adding
    }
  };

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

  const handleAddPlayers = (): void => {
    // Load players from local storage
    const players = loadPlayersFromStorage();
    // Create participants from players who are enabled
    const playerParticipants = players
      .filter((player) => player.isEnabled)
      .map(
        (player) =>
          ({
            id: Math.floor(Math.random() * 1000000),
            name: player.name,
            initiative: 0,
            creature: player,
          } as Participant)
      );
    // Add participants to state
    setParticipants((prevParticipants) => [
      ...prevParticipants,
      ...playerParticipants,
    ]);
  };

  // Sort participants by initiative, and by creature dex if on same before rendering
  participants.sort((a, b) => {
    if (a.initiative === b.initiative) {
      if (a.creature && b.creature) {
        return b.creature.stats.dex - a.creature.stats.dex;
      }
    }
    return b.initiative - a.initiative;
  });

  return (
    <Box>
      <VStack margin={2}>
        <VStack width="500px">
          {participants.map((participant) => (
            <HStack
              key={participant.id}
              backgroundColor={
                currentParticipant === participant ? "blue.500" : "blue.800"
              }
              padding={2}
              borderRadius="md"
              border="1px solid"
              justifyContent={"space-between"}
              width="100%"
            >
              <HStack>
                <Input
                  textAlign="center"
                  defaultValue={participant.initiative}
                  onChange={(valueString) => {
                    if (
                      valueString.target.value !== "" &&
                      !isNaN(parseInt(valueString.target.value, 10))
                    ) {
                      updateInitiative(
                        participant.id,
                        valueString.target.value
                      );
                    }
                  }}
                  w="40px" // Update width to 20
                  h="40px"
                  padding={0}
                />
                {!participant.creature && (
                  <Text
                    width={40} // Update width to 40px
                    textAlign="start"
                  >
                    {participant.name}
                  </Text>
                )}
                {participant.creature && (
                  <HStack>
                    <Text
                      width={40} // Update width to 40px
                      textAlign="start"
                    >
                      {participant.name}
                    </Text>
                    <VStack>
                      <Text
                        width={20} // Update width to 40px
                        textAlign="start"
                      >
                        AC: {participant.creature.armorClass}
                      </Text>
                      <Text
                        width={20} // Update width to 40px
                        textAlign="start"
                      >
                        MV: {participant.creature.speed}ft
                      </Text>
                    </VStack>
                  </HStack>
                )}
              </HStack>

              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                aria-label="Remove participant"
                onClick={() => handleRemoveParticipant(participant.id)}
              />
            </HStack>
          ))}
        </VStack>
        <HStack>
          <Button colorScheme="green" onClick={handleNextInitiative}>
            Next
          </Button>
          <Button colorScheme="blue" onClick={handleAddPlayers}>
            Add Players
          </Button>
          <Button colorScheme="blue" onClick={onOpen}>
            Add Encounter
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
      {/* Encounter Selection Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <DarkModalContent>
          <ModalHeader>Select an Encounter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select encounter"
              onChange={(e) => setSelectedEncounterId(e.target.value)}
            >
              {encounters.map((encounter) => (
                <option key={encounter.id} value={encounter.id}>
                  {encounter.name}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddEncounterParticipants}
            >
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </DarkModalContent>
      </Modal>
    </Box>
  );
};

export default InitiativeTracker;
