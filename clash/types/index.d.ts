export {};

interface CardPosition {
  x: number;
  y: number;
  width: number;
}

declare global {
  interface Window {
    cardPostions: { [key: string]: CardPosition | null };
  }
}
