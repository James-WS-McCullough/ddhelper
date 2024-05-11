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
        currentParticipant: { id: "", name: "", initiative: 0 },
      };
};

export const saveInitiativeToStorage = (initiative: InitiativeStorage) => {
  localStorage.setItem("initiative", JSON.stringify(initiative));
  console.log("Saved initiative to storage");
};
