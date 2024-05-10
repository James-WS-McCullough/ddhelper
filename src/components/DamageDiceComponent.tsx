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

  useEffect(() => {
    onChange(damageEntry);
  }, [damageEntry]);

  const handleDiceChange = (dice: diceArray) => {
    setDamageEntry((current) => ({ ...current, dice }));
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDamageEntry((current) => ({
      ...current,
      damageType: event.target.value as keyof typeof damageTypes,
    }));
  };

  return (
    <VStack alignItems="flex-start">
      <DiceComponent onChange={handleDiceChange} />
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
