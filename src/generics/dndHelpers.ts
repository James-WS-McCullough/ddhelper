import { creature, diceArray } from "../types/dndTypes";

// Helper function to calculate DEX modifier from DEX stat
export const calculateStatModifier = (value: number) => {
  return Math.floor((value - 10) / 2);
};

// Function to roll a d20
export const rollD20 = (
  rollType: "advantage" | "disadvantage" | "stright" = "stright"
) => {
  if (rollType === "advantage") {
    return Math.max(
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1
    );
  }
  if (rollType === "disadvantage") {
    return Math.min(
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1
    );
  }
  return Math.floor(Math.random() * 20) + 1;
};

export const calculatePassivePerception = (creature: creature): number => {
  const wisModifier = calculateStatModifier(creature.stats.WIS);
  return 10 + wisModifier;
};

type diceArrayProps = {
  dice: diceArray;
  modifier: number;
};

export const diceArrayToString = ({ dice, modifier }: diceArrayProps) => {
  const diceString = dice
    .map((die) => `${die.diceNumber}${die.diceType}`)
    .join(" + ");
  return `${diceString} + ${modifier}`;
};

export const rollDiceArray = ({ dice, modifier }: diceArrayProps) => {
  const total = dice.reduce((acc, die) => {
    const roll = Array.from({ length: die.diceNumber }, () =>
      Math.floor(Math.random() * parseInt(die.diceType.slice(1)) + 1)
    ).reduce((a, b) => a + b, 0);
    return acc + roll;
  }, 0);
  return total + modifier;
};

export const rollDiceArrayCrit = ({ dice, modifier }: diceArrayProps) => {
  const total = dice.reduce((acc, die) => {
    const roll = Array.from({ length: die.diceNumber }, () =>
      Math.floor(Math.random() * parseInt(die.diceType.slice(1)) + 1)
    ).reduce((a, b) => a + b, 0);
    return acc + roll;
  }, 0);
  return total * 2 + modifier;
};
