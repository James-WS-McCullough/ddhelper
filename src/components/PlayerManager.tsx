import { useEffect, useState } from "react";
import {
  Box,
  Button,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import { classes, player } from "../types/dndTypes";
import { PlayerForm } from "./PlayerForm";
import {
  loadPlayersFromStorage,
  savePlayersToStorage,
} from "../generics/localStorageHelpers";

export const PlayerManager: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [players, setPlayers] = useState<player[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<player | null>(null);

  useEffect(() => {
    const players = loadPlayersFromStorage();
    setPlayers(players);
  }, []);

  const openModalToAdd = () => {
    setEditingPlayer(null);
    onOpen();
  };

  const openModalToEdit = (player: player) => {
    setEditingPlayer(player);
    onOpen();
  };

  const handleSavePlayer = (player: player) => {
    if (editingPlayer) {
      setPlayers((prev) => {
        const newPlayers = prev.map((p) => (p === editingPlayer ? player : p));
        savePlayersToStorage(newPlayers);
        return newPlayers;
      });
    } else {
      setPlayers((prev) => {
        const newPlayers = [...prev, player];
        savePlayersToStorage(newPlayers);
        return newPlayers;
      });
    }
    onClose();
  };

  const handleDeletePlayer = (player: player) => {
    setPlayers((prev) => {
      const newPlayers = prev.filter((p) => p !== player);
      savePlayersToStorage(newPlayers);
      return newPlayers;
    });
    onClose();
  };

  const handleEnableToggle = (player: player) => {
    setPlayers((prev) => {
      const newPlayers = prev.map((p) =>
        p === player ? { ...p, isEnabled: !p.isEnabled } : p
      );
      savePlayersToStorage(newPlayers);
      return newPlayers;
    });
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {players.map((player, index) => (
          <HStack
            key={index}
            p={3}
            shadow="md"
            borderWidth="1px"
            borderColor={player.isEnabled ? "white" : "gray.400"}
            borderRadius={5}
            backgroundColor={player.isEnabled ? "green.800" : "gray.700"}
            width="100%"
            justifyContent="space-between"
          >
            <Text textColor={player.isEnabled ? "white" : "gray.400"}>
              {player.name} - LV{player.level} {classes[player.class]}
            </Text>
            <HStack>
              <Button
                ml={4}
                colorScheme="blue"
                onClick={() => openModalToEdit(player)}
              >
                Edit
              </Button>
              <Button
                ml={4}
                colorScheme={player.isEnabled ? "red" : "green"}
                onClick={() => handleEnableToggle(player)}
              >
                {player.isEnabled ? "Disable" : "Enable"}
              </Button>
            </HStack>
          </HStack>
        ))}
        <Button colorScheme="blue" onClick={openModalToAdd}>
          Add Player
        </Button>
      </VStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg="gray.800" textColor="white">
          <ModalHeader>
            {editingPlayer ? "Edit Player" : "Add Player"}
          </ModalHeader>
          <ModalBody>
            <PlayerForm
              player={editingPlayer}
              onSave={handleSavePlayer}
              onDelete={handleDeletePlayer}
              onCancel={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
