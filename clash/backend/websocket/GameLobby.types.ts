export interface User {
  id: string;
  username: string;
}

interface Deck {
  name: string;
  imgSrc: string;
  colors: string[];
  id: string;
}

interface Player {
  username: string;
  id: string;
  deck?: Deck | null;
}

export interface Lobby {
  lobbyId: string;
  name: string;
  players: Player[];
  numberOfPlayers: number;
  hostId: string;
  hostName: string;
}
