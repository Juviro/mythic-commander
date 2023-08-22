export interface User {
  id: string;
  avatar: string;
  username: string;
}

interface Deck {
  name: string;
  imgSrc: string;
  colors: string[];
  id: string;
}

export type Player = User & {
  deck?: Deck | null;
};

export interface Lobby {
  id: string;
  name: string;
  players: Player[];
  maxNumberOfPlayers: number;
  hostId: string;
}
