import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  alignments,
  monster,
  monsterSizes,
  monsterTypes,
} from "../types/dndTypes";
import { StatBlockInput } from "./StatBlockInput";
import AttackInput from "./AttackInput";
import FormBottomBar from "./FormBottomBar";

type MonsterFormProps = {
  monster?: monster; // Optional for editing
  onSave: (monster: monster) => void;
  onDelete: (monster: monster) => void;
  onCancel: () => void;
};

export const MonsterForm: React.FC<MonsterFormProps> = ({
  monster,
  onSave,
  onDelete,
  onCancel,
}) => {
  const [monsterDetails, setMonsterDetails] = useState<monster>(
    monster || {
      id: Date.now().toString(),
      name: "",
      type: "HUMANOID",
      size: "MEDIUM",
      alignment: "NEUTRAL_EVIL",
      armorClass: 10,
      maxHitPoints: 10,
      speed: 30,
      proficiencyBonus: 2,
      stats: { STR: 10, DEX: 10, CON: 10, INT: 10, WIS: 10, CHA: 10 },
      damageResistances: {},
      damageImmunities: {},
      conditionImmunities: {},
      senses: { darkvision: 60, passivePerception: 10 },
      languages: [],
      challengeRating: 0.25,
      traits: [],
      attacks: [],
      actions: [],
      legendaryActions: [],
    }
  );

  const handleSubmit = () => {
    onSave(monsterDetails);
  };

  const handleInputChange = (field: keyof monster, value: any) => {
    setMonsterDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatInputChange = (
    stat: keyof monster["stats"],
    value: number
  ) => {
    setMonsterDetails((prev) => ({
      ...prev,
      stats: { ...prev.stats, [stat]: value },
    }));
  };

  return (
    <VStack
      spacing={4}
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          value={monsterDetails.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Type</FormLabel>
        <Select
          value={monsterDetails.type}
          onChange={(e) => handleInputChange("type", e.target.value)}
        >
          {Object.entries(monsterTypes).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Size</FormLabel>
        <Select
          value={monsterDetails.size}
          onChange={(e) => handleInputChange("size", e.target.value)}
        >
          {Object.entries(monsterSizes).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Alignment</FormLabel>
        <Select
          value={monsterDetails.alignment}
          onChange={(e) => handleInputChange("alignment", e.target.value)}
        >
          {Object.entries(alignments).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Armor Class</FormLabel>
        <Input
          value={monsterDetails.armorClass}
          onChange={(e) =>
            handleInputChange("armorClass", parseInt(e.target.value))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Max Hit Points</FormLabel>
        <Input
          value={monsterDetails.maxHitPoints}
          onChange={(e) =>
            handleInputChange("maxHitPoints", parseInt(e.target.value))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>Speed</FormLabel>
        <Input
          value={monsterDetails.speed}
          onChange={(e) => handleInputChange("speed", parseInt(e.target.value))}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Proficiency Bonus</FormLabel>
        <Input
          value={monsterDetails.proficiencyBonus}
          onChange={(e) =>
            handleInputChange("proficiencyBonus", parseInt(e.target.value))
          }
        />
      </FormControl>
      <StatBlockInput
        statBlock={monsterDetails.stats}
        onChange={(stat, value) => handleStatInputChange(stat, value)}
      />
      <AttackInput
        attacks={monsterDetails.attacks}
        onSave={(attacks) => handleInputChange("attacks", attacks)}
      />
      <FormBottomBar
        onSave={handleSubmit}
        onDelete={() => onDelete(monsterDetails)}
        onCancel={onCancel}
        deleteEnabled={!!monster}
      />
    </VStack>
  );
};
