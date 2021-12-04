import {
  OracleCard,
  Card,
  CollectionCard,
  WantsListCard,
  DeckCard,
  Deck,
  WantsList,
} from './graphql';

export type UnifiedDeckCard = OracleCard & DeckCard & Card;
export type UnifiedCollectionCard = OracleCard & CollectionCard & Card;
export type UnifiedWantsListCard = OracleCard & WantsListCard & Card;
export type UnifiedListCard = UnifiedDeckCard | UnifiedWantsListCard;
export type UnifiedSingleCard = Omit<Card, '__typename' | 'oracleCard' | 'allSets'> &
  Omit<OracleCard, '__typename' | 'allSets'> & {
    __typename?: string;
    allSets?: UnifiedSingleCard[];
  };

export type UnifiedCardType<T> = T extends DeckCard
  ? UnifiedDeckCard
  : T extends CollectionCard
  ? UnifiedCollectionCard
  : T extends WantsListCard
  ? UnifiedWantsListCard
  : never;

export type UnifiedCard = UnifiedDeckCard | UnifiedCollectionCard | UnifiedWantsListCard;

export type ListCard = DeckCard | CollectionCard | WantsListCard;

export interface UnifiedDeck extends Omit<Deck, 'cards'> {
  originalCards: Array<DeckCard>;
  cards: Array<UnifiedDeckCard>;
}

export interface UnifiedWantsList extends Omit<WantsList, 'cards'> {
  originalCards: Array<WantsListCard>;
  cards: Array<UnifiedWantsListCard>;
}
export type UnifiedList = UnifiedDeck | UnifiedWantsList;
