export interface User {
  id: string;
  avatar: string;
  username: string;
}

export interface Deck {
  id: string;
  name?: string;
  imgSrc: string;
}

export type OwnDeck = Deck & {
  publicName: string;
};

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

export interface GameOptions {
  name: string;
  maxNumberOfPlayers: number;
}
