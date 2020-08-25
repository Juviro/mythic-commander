import { OracleCard, Card, CollectionCard, WantsListCard, DeckCard } from './graphql';

export type UnifiedDeckCard = OracleCard & DeckCard & Card;
export type UnifiedCollectionCard = OracleCard & CollectionCard & Card;
export type UnifiedWantsListCard = OracleCard & WantsListCard & Card;
export type UnifiedListCard = UnifiedDeckCard | UnifiedWantsListCard;
export type UnifiedSingleCard = Omit<Card, '__typename' | 'oracleCard'> &
  Omit<OracleCard, '__typename'> & { __typename?: string };

export type UnifiedCardType<T> = T extends DeckCard
  ? UnifiedDeckCard
  : T extends CollectionCard
  ? UnifiedCollectionCard
  : T extends WantsListCard
  ? UnifiedWantsListCard
  : never;

export type UnifiedCard = UnifiedDeckCard | UnifiedCollectionCard | UnifiedWantsListCard;

export type ListCard = DeckCard | CollectionCard | WantsListCard;
