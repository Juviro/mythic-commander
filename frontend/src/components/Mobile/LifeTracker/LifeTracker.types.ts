export interface GameSettings {
  numberOfPlayers: number;
  startingLife: number;
  displayDamage: boolean;
  displayLife: boolean;
  useImages: boolean;
  reduceLifeOnCommanderDmg: boolean;
}

export interface Player {
  id: string;
  color?: string;
  damageTaken: {
    id: string;
    damage: number;
  }[];
  img?: string;
  life: number;
  name: string;
}
