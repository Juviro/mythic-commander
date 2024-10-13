import { User } from 'backend/database/getUser';

export interface Deck {
  id: string;
  name?: string;
  imgSrc?: string;
  ownerName?: string;
  commanderName: string;
}

export type OwnDeck = Deck & {
  status: 'active' | 'draft' | 'archived';
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
  gameLoading?: boolean;
  gameReady?: boolean;
}

export interface GameOptions {
  name: string;
  maxNumberOfPlayers: number;
}
