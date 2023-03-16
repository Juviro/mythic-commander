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
  id: string;
  name: string;
  players: Player[];
  host: string;
}
