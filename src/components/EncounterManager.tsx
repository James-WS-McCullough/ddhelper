import { useEffect, useState } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  HStack,
  Text,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { EncounterForm } from "./EncounterForm"; // Make sure the path is correct
import { encounter } from "../types/dndTypes";
import {
  loadEncountersFromStorage,
  saveEncountersToStorage,
} from "../generics/localStorageHelpers";
import DarkModalContent from "./DarkModalContent";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const EncounterManager: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [encounters, setEncounters] = useState<encounter[]>([]);
  const [editingEncounter, setEditingEncounter] = useState<encounter | null>(
    null
  );

  useEffect(() => {
    const storedEncounters = loadEncountersFromStorage();
    setEncounters(storedEncounters);
  }, []);

  const openModalToAdd = () => {
    setEditingEncounter(null);
    onOpen();
  };

  const openModalToEdit = (encounter: encounter) => {
    setEditingEncounter(encounter);
    onOpen();
  };

  const handleSaveEncounter = (encounter: encounter) => {
    setEncounters((prev) => {
      const index = prev.findIndex((e) => e.id === encounter.id);
      if (index > -1) {
        saveEncountersToStorage(
          prev.map((e) => (e.id === encounter.id ? encounter : e))
        );
        return prev.map((e) => (e.id === encounter.id ? encounter : e));
      }
      saveEncountersToStorage([...prev, encounter]);
      return [...prev, encounter];
    });
    onClose();
  };

  const handleDuplicateEncounter = (encounter: encounter) => {
    const newEncounter = { ...encounter, id: Date.now().toString() };
    setEncounters((prev) => {
      saveEncountersToStorage([...prev, newEncounter]);
      return [...prev, newEncounter];
    });
    onClose();
  };

  const handleDeleteEncounter = (encounter: encounter) => {
    setEncounters((prev) => {
      const newEncounters = prev.filter((e) => e.id !== encounter.id);
      saveEncountersToStorage(newEncounters);
      return newEncounters;
    });
    onClose();
  };

  return (
    <Box p={4}>
      <Button mb={4} colorScheme="blue" onClick={openModalToAdd}>
        Create New Encounter
      </Button>
      <VStack>
        {encounters.map((encounter) => (
          <HStack
            key={encounter.id}
            p={3}
            shadow="md"
            borderWidth="1px"
            borderColor="white"
            borderRadius={5}
            backgroundColor="blue.800"
            width="100%"
            justifyContent="space-between"
          >
            <Text>{encounter.name}</Text>
            <HStack>
              <IconButton
                aria-label="Duplicate"
                icon={<ContentCopyIcon />}
                colorScheme="teal"
                onClick={() => handleDuplicateEncounter(encounter)}
              />
              <IconButton
                aria-label="Edit"
                icon={<EditIcon />}
                colorScheme="blue"
                onClick={() => openModalToEdit(encounter)}
              />
            </HStack>
          </HStack>
        ))}
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <DarkModalContent>
          <ModalHeader>
            {editingEncounter ? "Edit Encounter" : "Add Encounter"}
          </ModalHeader>
          <ModalBody>
            <EncounterForm
              encounter={editingEncounter}
              onSave={handleSaveEncounter}
              onCancel={onClose}
              onDelete={handleDeleteEncounter}
            />
          </ModalBody>
        </DarkModalContent>
      </Modal>
    </Box>
  );
};
