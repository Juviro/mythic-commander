import { User } from 'backend/database/getUser';

export interface LobbyDeck {
  id: string;
  name?: string;
  imgSrc?: string;
  ownerName?: string;
  commanderName?: string;
  colorIdentity?: string[];
  commanderIds?: string[];
}

export type OwnDeck = LobbyDeck & {
  status: 'active' | 'draft' | 'archived';
};

export type AlternativeCommander = {
  id: string;
  name: string;
  isPartner: boolean;
};

export type PreconDeck = LobbyDeck & {
  commanders: {
    id: string;
    name: string;
  }[];
  setName: string;
  setImg: string;
  deckUrl: string;
  alternativeCommanders?: AlternativeCommander[];
};

export type LobbyPlayer = User & {
  deck: LobbyDeck | null;
  isReady: boolean;
  color: string | null;
};

export interface PlanechaseSet {
  set: string;
  setName: string;
}

export interface Lobby {
  id: string;
  name: string;
  players: LobbyPlayer[];
  maxNumberOfPlayers: number;
  hostId: string;
  gameLoading?: boolean;
  gameReady?: boolean;
  planechaseSets?: PlanechaseSet[];
}

export interface GameOptions {
  name: string;
  maxNumberOfPlayers: number;
  planechaseSets?: PlanechaseSet[];
}
