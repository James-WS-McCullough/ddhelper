import React, { useState, useEffect } from "react";
import { HStack, Select, VStack } from "@chakra-ui/react";
import {
  DamageEntry,
  damageTypeEmojis,
  damageTypes,
  diceArray,
} from "../types/dndTypes";
import DiceComponent from "./DiceComponent";

type DamageDiceComponentProps = {
  onChange: (damageEntry: DamageEntry) => void;
  initialDamageEntry: DamageEntry;
};

const DamageDiceComponent = ({
  onChange,
  initialDamageEntry,
}: DamageDiceComponentProps) => {
  const [damageEntry, setDamageEntry] = useState(initialDamageEntry);

  const handleDiceChange = (dice: diceArray, modifier: number) => {
    setDamageEntry((current) => {
      const newDamageEntry = { ...current, dice, modifier };
      onChange(newDamageEntry);
      return newDamageEntry;
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDamageEntry((current) => {
      const newDamageEntry = {
        ...current,
        damageType: event.target.value as keyof typeof damageTypes,
      };

      onChange(newDamageEntry);
      return newDamageEntry;
    });
  };

  return (
    <VStack alignItems="flex-start">
      <DiceComponent
        onChange={handleDiceChange}
        initialDice={initialDamageEntry.dice}
        initialModifier={initialDamageEntry.modifier}
      />
      <Select value={damageEntry.damageType} onChange={handleTypeChange}>
        {Object.entries(damageTypeEmojis).map(([type, emoji]) => (
          <option key={type} value={type}>
            {emoji} {damageTypes[type as keyof typeof damageTypes]}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

export default DamageDiceComponent;
