export const damageTypes = {
  ACID: "Acid",
  BLUDGEONING: "Bludgeoning",
  COLD: "Cold",
  FIRE: "Fire",
  FORCE: "Force",
  LIGHTNING: "Lightning",
  NECROTIC: "Necrotic",
  PIERCING: "Piercing",
  POISON: "Poison",
  PSYCHIC: "Psychic",
  RADIANT: "Radiant",
  SLASHING: "Slashing",
  THUNDER: "Thunder",
};

export const damageTypeEmojis = {
  ACID: "🧪",
  BLUDGEONING: "🏏",
  COLD: "❄️",
  FIRE: "🔥",
  FORCE: "💥",
  LIGHTNING: "⚡",
  NECROTIC: "💀",
  PIERCING: "🗡️",
  POISON: "☠️",
  PSYCHIC: "🧠",
  RADIANT: "✨",
  SLASHING: "🪓",
  THUNDER: "🌩️",
};

export enum AttackType {
  Melee = "Melee",
  Ranged = "Ranged",
  Spell = "Spell",
  AoE = "AoE",
}

export const attackTypeEmojis = {
  Melee: "🗡️",
  Ranged: "🏹",
  Spell: "🔮",
  AoE: "💥",
  ConditionEffect: "🤕",
  Utility: "🛡️",
};

export type damageTypes = typeof damageTypes[keyof typeof damageTypes];

export const diceTypesEnums = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

export type diceOptions = typeof diceTypesEnums[number];

export enum SpellSubType {
  AttackRoll = "Attack Roll",
  SavingThrow = "Saving Throw",
}

export enum AoESubType {
  Cone = "Cone",
  Line = "Line",
  Sphere = "Sphere",
}

export enum ConditionEffectSubType {
  Grappled = "Grappled",
  Stunned = "Stunned",
  Poisoned = "Poisoned",
}

// Base Attack interface with common fields
export interface BaseAttack {
  id: number;
  name: string;
  type: AttackType;
  description?: string;
  damage: DamageEntry;
}

// Extended interfaces
export interface MeleeAttack extends BaseAttack {
  toHit: string;
  reach: string;
}
export interface RangedAttack extends BaseAttack {
  toHit: string;
  shortRange: string;
  longRange: string;
}

export interface SpellAttack extends BaseAttack {
  subType: SpellSubType;
  range: string;
  targets: string;
}

export interface AoEAttack extends BaseAttack {
  subType: AoESubType;
  width: string;
  range: string;
  saveDC: string;
}

export interface ConditionEffectAttack extends BaseAttack {
  subType: ConditionEffectSubType;
  effectTrigger: "Hit" | "Saving Throw";
  conditionSaveDC?: string;
  conditionDescription: string;
}

export interface UtilityAttack extends BaseAttack {
  utilityType: "Cover" | "Terrain" | "Illumination";
  effectDescription: string;
}

// Union type for all attack types
export type Attack =
  | MeleeAttack
  | RangedAttack
  | SpellAttack
  | AoEAttack
  | ConditionEffectAttack
  | UtilityAttack;

export type diceArray = {
  diceNumber: number;
  diceType: diceOptions;
}[];

export interface DamageEntry {
  dice: diceArray;
  modifier: number;
  damageType: keyof typeof damageTypes;
}

// DND Stats
export const stats = {
  STR: "Strength",
  DEX: "Dexterity",
  CON: "Constitution",
  INT: "Intelligence",
  WIS: "Wisdom",
  CHA: "Charisma",
};

export const statEmojis = {
  STR: "💪",
  DEX: "🏹",
  CON: "🛡️",
  INT: "🧠",
  WIS: "👁️",
  CHA: "💬",
};

export const statColors = {
  STR: "#FF0000",
  DEX: "#FFA500",
  CON: "#FFFF00",
  INT: "#00FF00",
  WIS: "#0000FF",
  CHA: "#800080",
};

export const statColorsDark = {
  STR: "#800000",
  DEX: "#804000",
  CON: "#808000",
  INT: "#008000",
  WIS: "#000080",
  CHA: "#400040",
};

export type stats = typeof stats[keyof typeof stats];
export type statBlock = {
  [key in stats]: number;
};

export const skills = {
  ACROBATICS: "Acrobatics",
  ANIMAL_HANDLING: "Animal Handling",
  ARCANA: "Arcana",
  ATHLETICS: "Athletics",
  DECEPTION: "Deception",
  HISTORY: "History",
  INSIGHT: "Insight",
  INTIMIDATION: "Intimidation",
  INVESTIGATION: "Investigation",
  MEDICINE: "Medicine",
  NATURE: "Nature",
  PERCEPTION: "Perception",
  PERFORMANCE: "Performance",
  PERSUASION: "Persuasion",
  RELIGION: "Religion",
  SLEIGHT_OF_HAND: "Sleight of Hand",
  STEALTH: "Stealth",
  SURVIVAL: "Survival",
};

export const skillStats = {
  ACROBATICS: stats.DEX,
  ANIMAL_HANDLING: stats.WIS,
  ARCANA: stats.INT,
  ATHLETICS: stats.STR,
  DECEPTION: stats.CHA,
  HISTORY: stats.INT,
  INSIGHT: stats.WIS,
  INTIMIDATION: stats.CHA,
  INVESTIGATION: stats.INT,
  MEDICINE: stats.WIS,
  NATURE: stats.INT,
  PERCEPTION: stats.WIS,
  PERFORMANCE: stats.CHA,
  PERSUASION: stats.CHA,
  RELIGION: stats.INT,
  SLEIGHT_OF_HAND: stats.DEX,
  STEALTH: stats.DEX,
  SURVIVAL: stats.WIS,
};

export type skills = typeof skills[keyof typeof skills];

export type skillBlock = {
  [key in skills]?: number;
};

export const conditions = {
  BLINDED: "Blinded",
  CHARMED: "Charmed",
  DEAFENED: "Deafened",
  FRIGHTENED: "Frightened",
  GRAPPLED: "Grappled",
  INCAPACITATED: "Incapacitated",
  INVISIBLE: "Invisible",
  PARALYZED: "Paralyzed",
  PETRIFIED: "Petrified",
  POISONED: "Poisoned",
  PRONE: "Prone",
  RESTRAINED: "Restrained",
  STUNNED: "Stunned",
  UNCONSCIOUS: "Unconscious",
};

export type conditions = typeof conditions[keyof typeof conditions];

export const languages = {
  COMMON: "Common",
  DWARVISH: "Dwarvish",
  ELVISH: "Elvish",
  GIANT: "Giant",
  GNOMISH: "Gnomish",
  GOBLIN: "Goblin",
  HALFLING: "Halfling",
  ORC: "Orc",
  ABYSSAL: "Abyssal",
  CELESTIAL: "Celestial",
  DRACONIC: "Draconic",
  DEEP_SPEECH: "Deep Speech",
  INFERNAL: "Infernal",
  PRIMORDIAL: "Primordial",
  SYLVAN: "Sylvan",
  UNDERCOMMON: "Undercommon",
};

export type languages = typeof languages[keyof typeof languages];

export const alignments = {
  LAWFUL_GOOD: "Lawful Good",
  NEUTRAL_GOOD: "Neutral Good",
  CHAOTIC_GOOD: "Chaotic Good",
  LAWFUL_NEUTRAL: "Lawful Neutral",
  TRUE_NEUTRAL: "True Neutral",
  CHAOTIC_NEUTRAL: "Chaotic Neutral",
  LAWFUL_EVIL: "Lawful Evil",
  NEUTRAL_EVIL: "Neutral Evil",
  CHAOTIC_EVIL: "Chaotic Evil",
};

export type alignments = typeof alignments[keyof typeof alignments];

export const armorTypes = {
  LIGHT: "Light",
  MEDIUM: "Medium",
  HEAVY: "Heavy",
  SHIELD: "Shield",
};

export type armorTypes = typeof armorTypes[keyof typeof armorTypes];

export const monsterTypes = {
  ABERRATION: "Aberration",
  BEAST: "Beast",
  CELESTIAL: "Celestial",
  CONSTRUCT: "Construct",
  DRAGON: "Dragon",
  ELEMENTAL: "Elemental",
  FEY: "Fey",
  FIEND: "Fiend",
  GIANT: "Giant",
  HUMANOID: "Humanoid",
  MONSTROSITY: "Monstrosity",
  OOZE: "Ooze",
  PLANT: "Plant",
  UNDEAD: "Undead",
};

export type monsterTypes = typeof monsterTypes[keyof typeof monsterTypes];

export const monsterSizes = {
  TINY: "Tiny",
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "Large",
  HUGE: "Huge",
  GARGANTUAN: "Gargantuan",
};

export type monsterSizes = typeof monsterSizes[keyof typeof monsterSizes];

export type senses = {
  darkvision: number;
  passivePerception: number;
};

export type encounter = {
  id: string;
  name: string;
  monsters: monsterGroup[];
};

// Define TypeScript interfaces for participant and props if necessary
export interface participant {
  id: number;
  name: string;
  initiative: number;
  creature?: creature;
  combatants?: combatant[];
  isEnabled: boolean;
}

export type combatant = {
  id: string;
  letter: string;
  hitPoints: number;
  conditions: conditions[];
};

export interface monster {
  id: string;
  name: string;
  type: monsterTypes;
  size: monsterSizes;
  alignment: alignments;
  armorClass: number;
  maxHitPoints: number;
  speed: number;
  proficiencyBonus: number;
  stats: statBlock;
  spellcastingAbility?: stats;
  attacks: Attack[];
  damageResistances: {
    [key in damageTypes]?: number;
  };
  damageImmunities: {
    [key in damageTypes]?: number;
  };
  conditionImmunities: {
    [key in conditions]?: number;
  };
  senses: senses;
  languages: languages[];
  challengeRating: number;
  traits: {
    name: string;
    description: string;
  }[];
  actions: {
    name: string;
    description: string;
  }[];
  legendaryActions: {
    name: string;
    description: string;
  }[];
}

export interface monsterGroup extends monster {
  count: number;
}

export type player = {
  name: string;
  class: classes;
  level: number;
  armorClass: number;
  speed: number;
  maxHitPoints: number;
  stats: statBlock;
  isEnabled: boolean;
};

export type creature = player | monster;

export const classes = {
  BARBARIAN: "Barbarian",
  BARD: "Bard",
  CLERIC: "Cleric",
  DRUID: "Druid",
  FIGHTER: "Fighter",
  MONK: "Monk",
  PALADIN: "Paladin",
  RANGER: "Ranger",
  ROGUE: "Rogue",
  SORCERER: "Sorcerer",
  WARLOCK: "Warlock",
  WIZARD: "Wizard",
};

export type classes = typeof classes[keyof typeof classes];

export const playerProficiencyBonus = {
  1: 2,
  2: 2,
  3: 2,
  4: 2,
  5: 3,
  6: 3,
  7: 3,
  8: 3,
  9: 4,
  10: 4,
  11: 4,
  12: 4,
  13: 5,
  14: 5,
  15: 5,
  16: 5,
  17: 6,
  18: 6,
  19: 6,
  20: 6,
};

export type faverouteEventType = {
  id: string;
  name: string;
  muteSoundsOnStart: boolean;
  soundsToPlay: string[];
  eventVideoToPlay: string;
  backgroundToShow: string;
  backgroundIsVideo: boolean;
  blackFadeOut: boolean;
  clearCharacterPortraits: boolean;
  characterPortraitsToShow: string[];
  buttonColor: string;
}