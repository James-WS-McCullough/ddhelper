// Helper function to calculate DEX modifier from DEX stat
export const calculateStatModifier = (value: number) => {
  return Math.floor((value - 10) / 2);
};

// Function to roll a d20
export const rollD20 = () => {
  return Math.floor(Math.random() * 20) + 1;
};
