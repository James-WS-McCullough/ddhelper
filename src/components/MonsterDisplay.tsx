import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  alignments,
  creature,
  monster,
  monsterSizes,
  monsterTypes,
} from "../types/dndTypes";
import { StatBlockInput } from "./StatBlockInput";
import AttackInput from "./AttackInput";
import FormBottomBar from "./FormBottomBar";
import { StatBlockDisplay } from "./StatBlockDisplay";
import { m } from "framer-motion";
import { AttackDisplay } from "./AttackDisplay";
import {
  calculateSpellsaveDC,
  calculateStatModifier,
} from "../generics/dndHelpers";

type CreatureDisplayProps = {
  creature: creature;
  targets: creature[];
};

export const CreatureDisplay: React.FC<CreatureDisplayProps> = ({
  creature,
  targets,
}) => {
  const toast = useToast();
  // If the creature is type monster, we can access the monster-specific fields.
  // Else, monster should be null.
  const monster = (creature as monster)?.type ? (creature as monster) : null;

  return (
    <VStack padding={2}>
      <HStack width="100%" alignItems="start">
        <VStack flex={1} justifyItems="start">
          <SimpleGrid columns={2} spacing={4} spacingX={8}>
            <Text>
              <strong>AC:</strong> {creature.armorClass}
            </Text>
            <Text>
              <strong>Max HP:</strong> {creature.maxHitPoints}
            </Text>
            <Text>
              <strong>Speed:</strong> {creature.speed}ft
            </Text>
            {!!monster && (
              <>
                <Text>
                  <strong>Type:</strong> {monsterTypes[monster.type]}
                </Text>
                <Text>
                  <strong>Size:</strong> {monsterSizes[monster.size]}
                </Text>
                <Text>
                  <strong>Alignment:</strong> {alignments[monster.alignment]}
                </Text>
                <Text>
                  <strong>Proficiency Bonus:</strong> +
                  {monster.proficiencyBonus}
                </Text>
                {!!monster.spellcastingAbility && (
                  <>
                    <Text>
                      <strong>Spellcasting Ability:</strong>{" "}
                      {monster.spellcastingAbility}
                    </Text>
                    <Text>
                      <strong>Spellsave DC:</strong>{" "}
                      {calculateSpellsaveDC(monster)}
                    </Text>
                  </>
                )}
              </>
            )}
          </SimpleGrid>
        </VStack>
        <VStack flex={1}>
          <StatBlockDisplay statBlock={creature.stats} toast={toast} />
        </VStack>
      </HStack>
      {!!monster && (
        <VStack width="100%" paddingTop="5">
          {monster.attacks.map((attack) => (
            <AttackDisplay
              key={attack.id}
              attack={attack}
              targets={targets}
              monster={monster}
              toast={toast}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};
