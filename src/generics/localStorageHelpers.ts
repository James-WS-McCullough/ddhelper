import { encounter, participant, player } from "../types/dndTypes";

export const loadPlayersFromStorage = (): player[] => {
  const storedPlayers = localStorage.getItem("players");
  console.log("Loaded players from storage");
  return storedPlayers ? JSON.parse(storedPlayers) : [];
};

export const savePlayersToStorage = (players: player[]) => {
  localStorage.setItem("players", JSON.stringify(players));
  console.log("Saved players to storage");
};

export const loadEncountersFromStorage = (): encounter[] => {
  const storedEncounters = localStorage.getItem("encounters");
  console.log("Loaded encounters from storage");
  return storedEncounters ? JSON.parse(storedEncounters) : [];
};

export const saveEncountersToStorage = (encounters: encounter[]) => {
  localStorage.setItem("encounters", JSON.stringify(encounters));
  console.log("Saved encounters to storage");
};

type InitiativeStorage = {
  participants: participant[];
  currentParticipant: participant | null;
};

export const loadInitiativeFromStorage = (): InitiativeStorage => {
  const storedInitiative = localStorage.getItem("initiative");
  console.log("Loaded initiative from storage");
  return storedInitiative
    ? JSON.parse(storedInitiative)
    : {
        participants: [],
        currentParticipant: null,
      };
};

export const saveInitiativeToStorage = (initiative: InitiativeStorage) => {
  localStorage.setItem("initiative", JSON.stringify(initiative));
  console.log("Saved initiative to storage");
};

// Battle Map storage
export interface GridToken {
  id: string;
  gridX: number;
  gridY: number;
  imageName: string; // Just the filename for reference
}

export interface BattleMapStorage {
  tokens: GridToken[];
  gridSize: number;
  showGrid: boolean;
}

export const loadBattleMapFromStorage = (): BattleMapStorage => {
  const storedBattleMap = localStorage.getItem("battleMap");
  console.log("Loaded battle map from storage");
  return storedBattleMap
    ? JSON.parse(storedBattleMap)
    : {
        tokens: [],
        gridSize: 20,
        showGrid: false, // Default to hidden
      };
};

export const saveBattleMapToStorage = (battleMap: BattleMapStorage) => {
  localStorage.setItem("battleMap", JSON.stringify(battleMap));
  console.log("Saved battle map to storage");
};
