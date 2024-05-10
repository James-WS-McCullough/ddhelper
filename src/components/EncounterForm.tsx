import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { MonsterForm } from "./MonsterForm"; // Ensure correct path
import { encounter, monster } from "../types/dndTypes";
import DarkModalContent from "./DarkModalContent";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FormBottomBar from "./FormBottomBar";

type EncounterFormProps = {
  encounter?: encounter;
  onSave: (encounter: encounter) => void;
  onCancel: () => void;
  onDelete: (encounter: encounter) => void;
};

export const EncounterForm: React.FC<EncounterFormProps> = ({
  encounter,
  onSave,
  onCancel,
  onDelete,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(encounter?.name || "");
  const [monsters, setMonsters] = useState<monster[]>(
    encounter?.monsters || []
  );
  const [editingMonster, setEditingMonster] = useState<monster | null>(null);

  const handleSaveEncounter = () => {
    const id = encounter?.id || Date.now().toString();
    onSave({ id, name, monsters });
  };

  const handleSaveMonster = (monster: monster) => {
    setMonsters((prev) => {
      const index = prev.findIndex((m) => m.id === monster.id);
      if (index > -1) {
        return prev.map((m) => (m.id === monster.id ? monster : m));
      }
      return [...prev, monster];
    });
    onClose(); // Close the modal after saving
  };

  const handleDuplicateMonster = (monster: monster) => {
    const newMonster = { ...monster, id: Date.now().toString() };
    setMonsters((prev) => [...prev, newMonster]);
  };

  const openMonsterModalToAdd = () => {
    setEditingMonster(null);
    onOpen();
  };

  const openMonsterModalToEdit = (monster: monster) => {
    setEditingMonster(monster);
    onOpen();
  };

  const handleDeleteMonster = (monster: monster) => {
    setMonsters((prev) => prev.filter((m) => m.id !== monster.id));
    onClose();
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Encounter Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormLabel marginTop={4}>Monsters</FormLabel>
      <VStack spacing={4}>
        {monsters.map((monster) => (
          <HStack
            key={monster.id}
            p={3}
            shadow="md"
            borderWidth="1px"
            borderColor="white"
            borderRadius={5}
            backgroundColor="purple.800"
            width="100%"
            justifyContent="space-between"
          >
            <Text textColor="white">{monster.name}</Text>
            <HStack>
              <IconButton
                colorScheme="teal"
                aria-label="Duplicate Monster"
                icon={<ContentCopyIcon />}
                onClick={() => handleDuplicateMonster(monster)}
              />
              <IconButton
                colorScheme="blue"
                aria-label="Edit Monster"
                icon={<EditIcon />}
                onClick={() => openMonsterModalToEdit(monster)}
              />
            </HStack>
          </HStack>
        ))}
        <Button colorScheme="green" onClick={openMonsterModalToAdd}>
          Add Monster
        </Button>
      </VStack>
      <FormBottomBar
        onSave={handleSaveEncounter}
        onCancel={onCancel}
        onDelete={encounter && (() => onDelete(encounter))}
        deleteEnabled={!!encounter}
        saveEnabled={name.length > 0}
      />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <DarkModalContent>
          <ModalHeader>
            {editingMonster ? "Edit Monster" : "Add Monster"}
          </ModalHeader>
          <ModalBody>
            <MonsterForm
              monster={editingMonster}
              onSave={handleSaveMonster}
              onDelete={handleDeleteMonster}
              onCancel={onClose}
            />
          </ModalBody>
        </DarkModalContent>
      </Modal>
    </Box>
  );
};
