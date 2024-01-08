import { User } from 'backend/database/getUser';

export interface Deck {
  id: string;
  name?: string;
  imgSrc: string;
  ownerName?: string;
}

export type OwnDeck = Deck & {
  publicName: string;
};

export type Player = User & {
  deck: Deck | null;
  isReady: boolean;
  color: string | null;
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
