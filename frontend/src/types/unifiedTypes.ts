import { OracleCard, Card, CollectionCard, WantsListCard, DeckCard } from './graphql';

export type UnifiedCard = OracleCard & Card & CollectionCard & WantsListCard & DeckCard;
export type ListCard = DeckCard | CollectionCard | WantsListCard;
