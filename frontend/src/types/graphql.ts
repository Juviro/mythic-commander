import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllLists = {
  __typename?: 'AllLists';
  decks: Array<Deck>;
  wantsLists: Array<WantsList>;
};

export type CachedCard = {
  __typename?: 'CachedCard';
  i: Scalars['String'];
  n: Scalars['String'];
  o: Scalars['String'];
  k?: Maybe<Scalars['String']>;
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['String'];
  set: Scalars['String'];
  name: Scalars['String'];
  image_uris?: Maybe<ImageUris>;
  card_faces?: Maybe<Array<CardFace>>;
  priceUsd: Scalars['Float'];
  priceEur: Scalars['Float'];
  prices: Prices;
  rarity: Scalars['String'];
  oracle_text?: Maybe<Scalars['String']>;
  scryfall_uri?: Maybe<Scalars['String']>;
  cmc: Scalars['Float'];
  legalities: Legalities;
  purchase_uris: PurchaseUris;
  oracle_id: Scalars['String'];
  rulings_uri: Scalars['String'];
  colors?: Maybe<Array<Maybe<Scalars['String']>>>;
  color_identity?: Maybe<Array<Maybe<Scalars['String']>>>;
  set_name: Scalars['String'];
  mana_cost?: Maybe<Scalars['String']>;
  foil: Scalars['Boolean'];
  nonfoil: Scalars['Boolean'];
  imgKey: Scalars['String'];
  amountOwned: Scalars['Int'];
  amountOwnedFoil: Scalars['Int'];
  possiblePartner?: Maybe<Scalars['String']>;
  canBeCommander: Scalars['Boolean'];
  oracleCard: OracleCard;
  relatedCards?: Maybe<Array<Card>>;
};

export type CardFace = {
  __typename?: 'CardFace';
  name: Scalars['String'];
  image_uris?: Maybe<ImageUris>;
  colors?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CardInputType = {
  id: Scalars['String'];
  amount?: Maybe<Scalars['Int']>;
  isFoil?: Maybe<Scalars['Boolean']>;
};

export type CardsOptionsInput = {
  name?: Maybe<Scalars['String']>;
  colors?: Maybe<Scalars['String']>;
  subType?: Maybe<Scalars['String']>;
  cardType?: Maybe<Scalars['String']>;
  isLegendary?: Maybe<Scalars['String']>;
  isCommanderLegal?: Maybe<Scalars['String']>;
  isOwned?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  cmc?: Maybe<Scalars['String']>;
  rarity?: Maybe<Scalars['String']>;
  power?: Maybe<Scalars['String']>;
  toughness?: Maybe<Scalars['String']>;
  set?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
};

export type ChangeCollectionInput = {
  id: Scalars['String'];
  amountOwned?: Maybe<Scalars['Int']>;
  amountOwnedFoil?: Maybe<Scalars['Int']>;
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['String'];
  visibility: Visibility;
  referenceSnapshot?: Maybe<CollectionSnapshot>;
  currentSnapshot: CollectionSnapshot;
};

export type CollectionCard = {
  __typename?: 'CollectionCard';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  card: Card;
};

export type CollectionSnapshot = {
  __typename?: 'CollectionSnapshot';
  date: Scalars['String'];
  value?: Maybe<Scalars['Int']>;
  amount?: Maybe<Scalars['Int']>;
  amountUnique?: Maybe<Scalars['Int']>;
};

export type ContainingList = {
  __typename?: 'ContainingList';
  id: Scalars['String'];
  name: Scalars['String'];
  amount: Scalars['Int'];
};

export type Deck = {
  __typename?: 'Deck';
  id: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['String'];
  lastEdit: Scalars['String'];
  imgSrc: Scalars['String'];
  numberOfCards: Scalars['Int'];
  visibility: Visibility;
  canEdit: Scalars['Boolean'];
  cards: Array<DeckCard>;
  wantsLists: Array<WantsList>;
};

export type DeckCard = {
  __typename?: 'DeckCard';
  id: Scalars['String'];
  amount: Scalars['Int'];
  createdAt: Scalars['String'];
  isCommander?: Maybe<Scalars['Boolean']>;
  card: Card;
};

export type EditDeckCardInput = {
  id?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  isCommander?: Maybe<Scalars['Boolean']>;
};

export type EditDeckFieldsInput = {
  name?: Maybe<Scalars['String']>;
  imgSrc?: Maybe<Scalars['String']>;
};

export type EditWantsListCardInput = {
  id?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
};

export type EditWantsListFieldsInput = {
  name?: Maybe<Scalars['String']>;
};

export type ImageUris = {
  __typename?: 'ImageUris';
  small?: Maybe<Scalars['String']>;
  normal?: Maybe<Scalars['String']>;
  art_crop?: Maybe<Scalars['String']>;
};

export type Legalities = {
  __typename?: 'Legalities';
  standard?: Maybe<Scalars['String']>;
  modern?: Maybe<Scalars['String']>;
  commander?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  session: Scalars['String'];
  user: User;
};

export type LtPlayer = {
  __typename?: 'LTPlayer';
  name: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  lastEdit?: Maybe<Scalars['String']>;
};

export type MoveCardInputType = {
  id: Scalars['String'];
  type: MoveToNameType;
};

export type MoveCardListType = WantsList | Deck;

export type MoveCardReturnType = {
  __typename?: 'MoveCardReturnType';
  from: MoveCardListType;
  to: MoveCardListType;
};

export enum MoveToNameType {
  Deck = 'DECK',
  WantsList = 'WANTS_LIST',
}

export type Mutation = {
  __typename?: 'Mutation';
  setUsername: User;
  createDeck: Deck;
  addCardsToDeck: Deck;
  editDeck: Deck;
  editDeckCard: DeckCard;
  setCommander: Deck;
  deleteDeck?: Maybe<Scalars['Boolean']>;
  deleteFromDeck: Deck;
  duplicateDeck: Scalars['String'];
  changeDeckVisibility: Deck;
  moveCard: MoveCardReturnType;
  addToCollection: Array<CollectionCard>;
  changeCollection?: Maybe<CollectionCard>;
  deleteFromCollection?: Maybe<Scalars['Boolean']>;
  deleteAllFromCollection?: Maybe<Scalars['Boolean']>;
  changeCollectionVisibility: Collection;
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  createWantsList: WantsList;
  editWantsList: WantsList;
  editWantsListCard: WantsListCard;
  deleteFromWantsList: WantsList;
  deleteWantsList: Scalars['Boolean'];
  duplicateWantsList: WantsList;
  addCardsToWantsList: Array<WantsListCard>;
  linkWantsList: WantsList;
  unlinkWantsList: WantsList;
  changeWantsListVisibility: WantsList;
  updateLtPlayer: LtPlayer;
  deleteLtPlayer?: Maybe<Scalars['Boolean']>;
};

export type MutationSetUsernameArgs = {
  username: Scalars['String'];
};

export type MutationAddCardsToDeckArgs = {
  deckId: Scalars['String'];
  deckName?: Maybe<Scalars['String']>;
  cards: Array<CardInputType>;
};

export type MutationEditDeckArgs = {
  deckId: Scalars['String'];
  newProperties: EditDeckFieldsInput;
};

export type MutationEditDeckCardArgs = {
  cardId: Scalars['String'];
  deckId: Scalars['String'];
  newProps: EditDeckCardInput;
};

export type MutationSetCommanderArgs = {
  cardIds: Array<Scalars['String']>;
  deckId: Scalars['String'];
};

export type MutationDeleteDeckArgs = {
  deckId: Scalars['String'];
};

export type MutationDeleteFromDeckArgs = {
  cardId?: Maybe<Scalars['String']>;
  cardIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  deckId: Scalars['String'];
};

export type MutationDuplicateDeckArgs = {
  deckId: Scalars['String'];
};

export type MutationChangeDeckVisibilityArgs = {
  deckId: Scalars['String'];
  visibility: Visibility;
};

export type MutationMoveCardArgs = {
  cardId: Scalars['String'];
  from: MoveCardInputType;
  to: MoveCardInputType;
};

export type MutationAddToCollectionArgs = {
  cards: Array<Maybe<CardInputType>>;
};

export type MutationChangeCollectionArgs = {
  cardOracleId: Scalars['String'];
  added?: Maybe<Array<ChangeCollectionInput>>;
  edited?: Maybe<Array<ChangeCollectionInput>>;
  deleted?: Maybe<Array<Scalars['String']>>;
  cardId?: Maybe<Scalars['String']>;
};

export type MutationDeleteFromCollectionArgs = {
  cardIds: Array<Maybe<Scalars['String']>>;
};

export type MutationDeleteAllFromCollectionArgs = {
  oracleIds: Array<Scalars['String']>;
};

export type MutationChangeCollectionVisibilityArgs = {
  visibility: Visibility;
};

export type MutationLoginArgs = {
  token: Scalars['String'];
};

export type MutationLogoutArgs = {
  sessionId: Scalars['String'];
};

export type MutationCreateWantsListArgs = {
  deckId?: Maybe<Scalars['String']>;
};

export type MutationEditWantsListArgs = {
  wantsListId: Scalars['String'];
  newProperties: EditWantsListFieldsInput;
};

export type MutationEditWantsListCardArgs = {
  cardId: Scalars['String'];
  wantsListId: Scalars['String'];
  newProps: EditWantsListCardInput;
};

export type MutationDeleteFromWantsListArgs = {
  oracleIds: Array<Scalars['String']>;
  wantsListId: Scalars['String'];
};

export type MutationDeleteWantsListArgs = {
  wantsListId: Scalars['String'];
};

export type MutationDuplicateWantsListArgs = {
  wantsListId: Scalars['String'];
};

export type MutationAddCardsToWantsListArgs = {
  wantsListId: Scalars['String'];
  wantsListName?: Maybe<Scalars['String']>;
  cards: Array<CardInputType>;
};

export type MutationLinkWantsListArgs = {
  wantsListId: Scalars['String'];
  deckId: Scalars['String'];
};

export type MutationUnlinkWantsListArgs = {
  wantsListId: Scalars['String'];
};

export type MutationChangeWantsListVisibilityArgs = {
  wantsListId: Scalars['String'];
  visibility: Visibility;
};

export type MutationUpdateLtPlayerArgs = {
  name: Scalars['String'];
  img?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type MutationDeleteLtPlayerArgs = {
  name: Scalars['String'];
};

export type OracleCard = {
  __typename?: 'OracleCard';
  _id: Scalars['String'];
  sumPriceUsd?: Maybe<Scalars['Float']>;
  sumPriceEur?: Maybe<Scalars['Float']>;
  minPriceUsd: Scalars['Float'];
  minPriceEur: Scalars['Float'];
  allSets: Array<Card>;
  owned: Scalars['Boolean'];
  totalAmount: Scalars['Int'];
  isTwoFaced: Scalars['Boolean'];
  isCommanderLegal: Scalars['Boolean'];
  primaryTypes: Array<Scalars['String']>;
  subTypes: Array<Scalars['String']>;
  containingDecks: Array<Deck>;
  containingWantsLists: Array<ContainingList>;
};

export type PaginatedCards = {
  __typename?: 'PaginatedCards';
  hasMore: Scalars['Boolean'];
  nextOffset?: Maybe<Scalars['Int']>;
  totalResults: Scalars['Int'];
  cards: Array<Card>;
};

export type PaginatedCollection = {
  __typename?: 'PaginatedCollection';
  hasMore: Scalars['Boolean'];
  nextOffset?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  totalResults: Scalars['Int'];
  cards: Array<CollectionCard>;
};

export type Prices = {
  __typename?: 'Prices';
  eur?: Maybe<Scalars['String']>;
  usd?: Maybe<Scalars['String']>;
  eur_foil?: Maybe<Scalars['String']>;
  usd_foil?: Maybe<Scalars['String']>;
};

export type ProxyCard = {
  __typename?: 'ProxyCard';
  id: Scalars['String'];
  amount?: Maybe<Scalars['Int']>;
  imgKey: Scalars['String'];
};

export type PurchaseUris = {
  __typename?: 'PurchaseUris';
  tcgplayer?: Maybe<Scalars['String']>;
  cardmarket?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  deck?: Maybe<Deck>;
  decks: Array<Deck>;
  collection: Collection;
  paginatedCollection: PaginatedCollection;
  ownedCardNames: Array<Scalars['String']>;
  collectionSnapshots: Array<CollectionSnapshot>;
  publicCollection?: Maybe<Array<CollectionCard>>;
  wantedCards?: Maybe<WantedCards>;
  card: Card;
  cards: Array<Maybe<Card>>;
  cardImages: Array<Maybe<Scalars['String']>>;
  cardSearch: PaginatedCards;
  cardByOracleId?: Maybe<Card>;
  cardsBySet: Array<CachedCard>;
  numberOfCachedCards: Scalars['Int'];
  cachedCards: Array<CachedCard>;
  wantsList: WantsList;
  wantsLists: Array<WantsList>;
  proxies: Array<ProxyCard>;
  allLists: AllLists;
  ltPlayers?: Maybe<Array<LtPlayer>>;
};

export type QueryDeckArgs = {
  id: Scalars['String'];
};

export type QueryPaginatedCollectionArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  orderBy: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  addedWithin?: Maybe<Scalars['Int']>;
};

export type QueryPublicCollectionArgs = {
  username: Scalars['String'];
};

export type QueryWantedCardsArgs = {
  username: Scalars['String'];
};

export type QueryCardArgs = {
  id: Scalars['String'];
};

export type QueryCardsArgs = {
  cardIds: Array<Maybe<Scalars['String']>>;
};

export type QueryCardImagesArgs = {
  cardId: Scalars['String'];
};

export type QueryCardSearchArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  options: CardsOptionsInput;
};

export type QueryCardByOracleIdArgs = {
  oracle_id: Scalars['String'];
};

export type QueryCardsBySetArgs = {
  setKey: Scalars['String'];
};

export type QueryWantsListArgs = {
  id: Scalars['String'];
};

export type QueryWantsListsArgs = {
  deckId?: Maybe<Scalars['String']>;
};

export type QueryProxiesArgs = {
  type: Scalars['String'];
  value: Scalars['String'];
  filter?: Maybe<Scalars['String']>;
};

export type Set = {
  __typename?: 'Set';
  id: Scalars['String'];
  set: Scalars['String'];
  prices: Prices;
  image_uris?: Maybe<ImageUris>;
  card_faces?: Maybe<Array<CardFace>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  avatar: Scalars['String'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  featureFlags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum Visibility {
  Private = 'private',
  Hidden = 'hidden',
  Public = 'public',
}

export type WantedCard = {
  __typename?: 'WantedCard';
  id: Scalars['String'];
  name: Scalars['String'];
  imgKey: Scalars['String'];
  oracle_id: Scalars['String'];
};

export type WantedCards = {
  __typename?: 'WantedCards';
  decks: Array<Maybe<WantedCardsList>>;
  wantsLists: Array<Maybe<WantedCardsList>>;
};

export type WantedCardsList = {
  __typename?: 'WantedCardsList';
  id: Scalars['String'];
  name: Scalars['String'];
  imgSrc?: Maybe<Scalars['String']>;
  cards: Array<WantedCard>;
};

export type WantsList = {
  __typename?: 'WantsList';
  id: Scalars['String'];
  name: Scalars['String'];
  lastEdit: Scalars['String'];
  createdAt: Scalars['String'];
  numberOfCards: Scalars['Int'];
  deck?: Maybe<Deck>;
  canEdit: Scalars['Boolean'];
  visibility: Visibility;
  cards: Array<WantsListCard>;
};

export type WantsListCard = {
  __typename?: 'WantsListCard';
  id: Scalars['String'];
  createdAt: Scalars['String'];
  amount: Scalars['Int'];
  card: Card;
};
