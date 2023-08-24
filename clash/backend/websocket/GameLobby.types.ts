export interface Deck {
  id: string;
  name?: string;
  imgSrc: string;
}

export type OwnDeck = Deck & {
  publicName: string;
};

export interface User {
  id: string;
  avatar: string;
  username: string;
}

export type Player = User & {
  deck?: Deck | null;
  isReady: boolean;
};

export interface Lobby {
  id: string;
  name: string;
  players: Player[];
  maxNumberOfPlayers: number;
  hostId: string;
  starting?: boolean;
}

export interface GameOptions {
  name: string;
  maxNumberOfPlayers: number;
}
