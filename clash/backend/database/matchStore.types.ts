import { LayoutType } from './gamestate.types';

interface Part {
  id: string;
  name: string;
  component: string;
  type_line: string;
  produced_mana: string[];
}

export interface InitMatchCard {
  id: string;
  name: string;
  amount: number;
  manaValue: number;
  transformable: boolean;
  flippable: boolean;
  type_line: string;
  produced_mana: string[];
  layout: LayoutType;
  all_parts: Part[];
}

export interface Deck {
  id: string;
  name: string;
  commanderIds: string[];
  cards: InitMatchCard[];
}

export interface Plane {
  id: string;
  name: string;
  type_line: string;
  oracle_text: string;
  all_parts: Part[];
}
