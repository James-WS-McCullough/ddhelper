import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  Box,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Attack, MeleeAttack, RangedAttack, creature } from "../types/dndTypes";
import {
  rollD20,
  rollDiceArray,
  rollDiceArrayCrit,
} from "../generics/dndHelpers";
import DarkModalContent from "./DarkModalContent";
import CasinoIcon from "@mui/icons-material/Casino";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { D20OutlineIcon } from "../assets/D20OutlineIcon";
import { TwoD20OutlineIcon } from "../assets/TwoD20OutlineIcon";

type ToHitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targets: creature[];
  attack: Attack;
  toast: any;
};

export const ToHitModal = ({
  isOpen,
  onClose,
  targets,
  attack,
  toast,
}: ToHitModalProps) => {
  const handleAttackTarget = (target, rollType) => {
    const d20Result = rollD20(rollType);
    const result =
      d20Result +
      parseInt((attack as MeleeAttack).toHit || (attack as RangedAttack).toHit);
    const isSuccess =
      d20Result === 20 || (d20Result != 1 && result >= target.armorClass);
    const isCriticalSuccess = d20Result === 20;
    let damage = 0;

    if (isCriticalSuccess) {
      damage = rollDiceArrayCrit(attack.damage);
    } else if (isSuccess) {
      damage = rollDiceArray(attack.damage);
    }
    toast({
      title: `${
        d20Result === 20
          ? "Critical Hit!"
          : d20Result === 1
          ? "Critical Fail!"
          : isSuccess
          ? "Hit!"
          : "Miss!"
      }`,
      status: isSuccess ? "success" : "error",
      description: `Rolled ${result} to hit${
        isSuccess ? ` and dealt ${damage} damage!` : `!`
      }`,
      duration: 10000,
      position: "bottom-right",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <DarkModalContent>
        <ModalHeader>Choose a Target</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={3} spacing={4}>
            {targets.map((target) => (
              <Box
                key={target.name}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                backgroundColor="gray.700"
              >
                <Text fontWeight="bold" fontSize="lg">
                  {target.name}
                </Text>
                <Text>AC: {target.armorClass}</Text>
                <Text>HP: {target.maxHitPoints}</Text>
                <HStack spacing={1} justifyContent="center" mt="3">
                  <IconButton
                    icon={<D20OutlineIcon color="white" />}
                    aria-label="Attack"
                    colorScheme="blue"
                    onClick={() => handleAttackTarget(target, "stright")}
                  />
                  <IconButton
                    icon={<TwoD20OutlineIcon color="white" />}
                    aria-label="Attack with Advantage"
                    colorScheme="green"
                    onClick={() => handleAttackTarget(target, "advantage")}
                  />
                  <IconButton
                    icon={<TwoD20OutlineIcon color="white" />}
                    aria-label="Attack with Disadvantage"
                    colorScheme="red"
                    onClick={() => handleAttackTarget(target, "disadvantage")}
                  />
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
      </DarkModalContent>
    </Modal>
  );
};
