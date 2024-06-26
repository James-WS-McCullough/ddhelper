import React from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  Toast,
  useToast,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  BaseAttack,
  MeleeAttack,
  RangedAttack,
  SpellAttack,
  AoEAttack,
  ConditionEffectAttack,
  UtilityAttack,
  creature,
  Attack,
  monster,
} from "../types/dndTypes"; // Ensure proper import paths
import {
  calculateSpellsaveDC,
  diceArrayToString,
  rollDiceArray,
} from "../generics/dndHelpers";
import CasinoIcon from "@mui/icons-material/Casino";
import { ToHitModal } from "./ToHitModal";
import { formatDistance } from "../generics/parseFilename";

type AttackDisplayProps = {
  attack: Attack;
  targets: creature[];
  monster: monster;
  toast: any;
};

export const AttackDisplay: React.FC<AttackDisplayProps> = ({
  attack,
  targets,
  monster,
  toast,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderAttackDetails = (attack: BaseAttack) => {
    switch (attack.type) {
      case "Melee":
        const melee = attack as MeleeAttack;
        return `To Hit: ${melee.toHit}, Reach: ${
          melee.reach
        }, Damage:  ${diceArrayToString(melee.damage)}`;
      case "Ranged":
        const ranged = attack as RangedAttack;
        return `To Hit: ${ranged.toHit}, Range: ${formatDistance(
          ranged.shortRange
        )}/${formatDistance(ranged.longRange)}, Damage: ${diceArrayToString(
          ranged.damage
        )}`;
      case "Spell":
        const spell = attack as SpellAttack;
        return `Spellsave DC: ${calculateSpellsaveDC(
          monster
        )}, Range: ${formatDistance(spell.range)}, Targets: ${
          spell.targets
        }, Damage: ${diceArrayToString(spell.damage)}`;
      case "AoE":
        const aoe = attack as AoEAttack;
        return `Shape: ${aoe.subType}, Range: ${formatDistance(
          aoe.range
        )}, Width: ${formatDistance(aoe.width)}, Save DC: ${
          aoe.saveDC
        }, Damage: ${diceArrayToString(aoe.damage)}`;
      default:
        return `Damage: ${diceArrayToString(attack.damage)}`;
    }
  };

  const handleRollDamage = () => {
    // Placeholder for rolling damage logic
    const result = rollDiceArray(attack.damage);
    toast({
      title: `${result} damage!`,
      status: "success",
      duration: 6000,
      position: "bottom-right",
    });
  };

  return (
    <VStack
      width="100%"
      bg="purple.800"
      borderRadius="md"
      borderWidth={1}
      padding={2}
    >
      <HStack spacing={4} alignItems="center" width={"100%"}>
        <Text fontWeight="bold">{attack.name}</Text>
        <Text flex="1">{renderAttackDetails(attack)}</Text>
        <HStack>
          {attack.type === "Melee" ||
          attack.type === "Ranged" ||
          (attack.type === "Spell" &&
            (attack as SpellAttack).subType === "Attack Roll") ? (
            <Button colorScheme="blue" onClick={onOpen}>
              To Hit
            </Button>
          ) : null}
          <Button colorScheme="red" onClick={handleRollDamage}>
            Damage
          </Button>
        </HStack>
      </HStack>
      <Text>{attack.description}</Text>
      <ToHitModal
        targets={targets}
        attack={attack}
        monster={monster}
        isOpen={isOpen}
        onClose={onClose}
        toast={toast}
      />
    </VStack>
  );
};
