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
}

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
}

type damageTypes = typeof damageTypes[keyof typeof damageTypes];