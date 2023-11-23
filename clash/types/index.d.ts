import { Zone } from 'backend/database/gamestate.types';

export {};

export interface CardPosition {
  x: number;
  y: number;
  width: number;
  isVisible: boolean;
  zone?: Zone;
}

declare global {
  interface Window {
    cardPostions: { [key: string]: CardPosition | null };
  }
}
