import { encounter, player } from "../types/dndTypes";

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
