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
import {
  combatant,
  conditions,
  creature,
  encounter,
  monsterGroup,
} from "../types/dndTypes";
import {
  loadEncountersFromStorage,
  loadPlayersFromStorage,
} from "../generics/localStorageHelpers";
import DarkModalContent from "./DarkModalContent";
import { calculateStatModifier, rollD20 } from "../generics/dndHelpers";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Define TypeScript interfaces for participant and props if necessary
interface Participant {
  id: number;
  name: string;
  initiative: number;
  creature?: creature;
  combatants?: combatant[];
}

const InitiativeTracker: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState<string>("");
  const [newInitiative, setNewInitiative] = useState<string>("");
  const [encounters, setEncounters] = useState<encounter[]>([]);
  const [selectedEncounterId, setSelectedEncounterId] = useState<string>("");
  const [selectedParticipantId, setSelectedParticipantId] = useState<number>(0);
  const [selectedCombatantId, setSelectedCombatantId] = useState<string>("");
  const [damageInput, setDamageInput] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useState<conditions>(
    conditions.BLINDED
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDamageModalOpen,
    onOpen: onDamageModalOpen,
    onClose: onDamageModalClose,
  } = useDisclosure();

  useEffect(() => {
    setEncounters(loadEncountersFromStorage());
  }, []);

  const handleAddEncounterParticipants = () => {
    const selectedEncounter = encounters.find(
      (e) => e.id === selectedEncounterId
    );
    if (selectedEncounter) {
      const encounterParticipants = selectedEncounter.monsters.map(
        (monster) => {
          const combatants = Array.from({ length: monster.count }, (_, i) => ({
            id: (Date.now() + Math.random()).toString(), // Ensure unique ID
            letter: String.fromCharCode(65 + i),
            hitPoints: monster.hitPoints,
            conditions: [],
          })) as combatant[];

          return {
            id: Date.now() + Math.random(), // Ensure unique ID
            name: monster.name + (monster.count > 1 ? "s" : ""),
            initiative: rollD20() + calculateStatModifier(monster.stats.DEX),
            creature: monster,
            combatants,
          };
        }
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

  const handleUpdateCombatant = ({
    damage,
    conditions,
  }: {
    damage?: number;
    conditions?: conditions[];
  }) => {
    const updatedParticipants = participants.map((participant) => {
      if (participant.id === selectedParticipantId) {
        const updatedCombatants = participant.combatants?.map((combatant) => {
          if (combatant.id === selectedCombatantId) {
            return {
              ...combatant,
              conditions: conditions ? conditions : combatant.conditions,
              hitPoints: damage
                ? Math.max(
                    Math.min(
                      combatant.hitPoints - damage,
                      (participant.creature as monsterGroup)?.hitPoints || 1000
                    ),
                    0
                  )
                : combatant.hitPoints,
            };
          }
          return combatant;
        });
        return { ...participant, combatants: updatedCombatants };
      }
      return participant;
    });
    setParticipants(updatedParticipants);
    onDamageModalClose();
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
        <VStack width="100%">
          {participants.map((participant) => (
            <HStack
              key={participant.id}
              backgroundColor={
                currentParticipant === participant ? "blue.500" : "blue.800"
              }
              padding={3}
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
                    {participant.combatants && (
                      <VStack alignItems="start">
                        {participant.combatants.map((combatant) => (
                          <HStack>
                            <IconButton
                              icon={<EditIcon />}
                              size="sm"
                              colorScheme="pink"
                              aria-label="Damage"
                              onClick={() => {
                                setSelectedParticipantId(participant.id);
                                setSelectedCombatantId(combatant.id);
                                setDamageInput("");
                                onDamageModalOpen();
                              }}
                            />
                            {participant.combatants.length > 1 && (
                              <Text key={combatant.id}>
                                {combatant.letter}:
                              </Text>
                            )}
                            {combatant.hitPoints > 0 ? (
                              <Text
                                key={combatant.id}
                                color={
                                  (participant.creature as monsterGroup)
                                    .hitPoints /
                                    2 >
                                  combatant.hitPoints
                                    ? "orange"
                                    : "white"
                                }
                              >
                                {combatant.hitPoints}/
                                {
                                  (participant.creature as monsterGroup)
                                    .hitPoints
                                }{" "}
                                hp
                              </Text>
                            ) : (
                              <Text key={combatant.id} color="red">
                                Dead
                              </Text>
                            )}
                            <HStack>
                              {combatant.conditions.map((condition) => (
                                <Text
                                  key={condition}
                                  backgroundColor="gray.900"
                                  color="white"
                                  fontWeight="bold"
                                  borderRadius="xl"
                                  padding={1}
                                  paddingInline={2}
                                >
                                  {conditions[condition]}
                                </Text>
                              ))}
                            </HStack>
                          </HStack>
                        ))}
                      </VStack>
                    )}
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
      <Modal isOpen={isDamageModalOpen} onClose={onDamageModalClose}>
        <ModalOverlay />
        <DarkModalContent>
          <ModalHeader>Update Combatant</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={14} padding={5}>
              <VStack>
                <FormLabel>Update Hitpoints</FormLabel>
                <HStack>
                  <NumberInput
                    value={damageInput}
                    onChange={(valueString) => setDamageInput(valueString)}
                  >
                    <NumberInputField
                      placeholder="10"
                      width="60px"
                      p="0"
                      textAlign="center"
                    />
                  </NumberInput>
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      handleUpdateCombatant({
                        damage: parseInt(damageInput) || 0,
                      })
                    }
                  >
                    Damage
                  </Button>
                  <Button
                    colorScheme="green"
                    onClick={() =>
                      handleUpdateCombatant({ damage: -damageInput })
                    }
                  >
                    Heal
                  </Button>
                </HStack>
              </VStack>
              <VStack>
                <FormLabel>Add Conditions</FormLabel>
                <HStack>
                  <Select
                    placeholder="Select Condition"
                    onChange={(e) =>
                      setSelectedCondition(e.target.value as conditions)
                    }
                  >
                    {Object.entries(conditions).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </Select>

                  <Button
                    colorScheme="green"
                    onClick={() => {
                      handleUpdateCombatant({
                        conditions: [
                          ...(participants
                            .find((p) => p.id === selectedParticipantId)
                            ?.combatants?.find(
                              (c) => c.id === selectedCombatantId
                            )?.conditions || []),
                          selectedCondition,
                        ],
                      });
                    }}
                  >
                    Add
                  </Button>
                </HStack>
              </VStack>
              {participants
                .find((p) => p.id === selectedParticipantId)
                ?.combatants?.find((c) => c.id === selectedCombatantId)
                ?.conditions.length > 0 && (
                <VStack>
                  <FormLabel>Clear Conditions:</FormLabel>
                  <HStack>
                    {participants
                      .find((p) => p.id === selectedParticipantId)
                      ?.combatants?.find((c) => c.id === selectedCombatantId)
                      ?.conditions.map((condition) => (
                        <Button
                          key={condition}
                          colorScheme="pink"
                          onClick={() =>
                            handleUpdateCombatant({
                              conditions: participants
                                .find((p) => p.id === selectedParticipantId)
                                ?.combatants?.find(
                                  (c) => c.id === selectedCombatantId
                                )
                                ?.conditions.filter((c) => c !== condition),
                            })
                          }
                        >
                          {conditions[condition]}
                        </Button>
                      ))}
                  </HStack>
                </VStack>
              )}
            </VStack>
          </ModalBody>
        </DarkModalContent>
      </Modal>
    </Box>
  );
};

export default InitiativeTracker;
