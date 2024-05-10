import { player } from "../types/dndTypes";

export const loadPlayersFromStorage = (): player[] => {
  const storedPlayers = localStorage.getItem("players");
  console.log("Loaded players from storage");
  return storedPlayers ? JSON.parse(storedPlayers) : [];
};

export const savePlayersToStorage = (players: player[]) => {
  localStorage.setItem("players", JSON.stringify(players));
  console.log("Saved players to storage");
};
