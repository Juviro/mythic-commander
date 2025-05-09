import { User } from 'backend/database/getUser';

export interface LobbyDeck {
  id: string;
  name?: string;
  imgSrc?: string;
  ownerName?: string;
  commanderName?: string;
  colorIdentity?: string[];
}

export type OwnDeck = LobbyDeck & {
  status: 'active' | 'draft' | 'archived';
};

export type PreconDeck = LobbyDeck & {
  releaseName: string;
  deckUrl: string;
};

export type LobbyPlayer = User & {
  deck: LobbyDeck | null;
  isReady: boolean;
  color: string | null;
};

export interface Lobby {
  id: string;
  name: string;
  players: LobbyPlayer[];
  maxNumberOfPlayers: number;
  hostId: string;
  gameLoading?: boolean;
  gameReady?: boolean;
}

export interface GameOptions {
  name: string;
  maxNumberOfPlayers: number;
}
