import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  k?: Maybe<Scalars['String']>;
  n: Scalars['String'];
  o: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  amountOwned: Scalars['Int'];
  amountOwnedFoil: Scalars['Int'];
  canBeCommander: Scalars['Boolean'];
  card_faces?: Maybe<Array<CardFace>>;
  cmc: Scalars['Float'];
  collector_number: Scalars['String'];
  color_identity?: Maybe<Array<Maybe<Scalars['String']>>>;
  colors?: Maybe<Array<Maybe<Scalars['String']>>>;
  foil: Scalars['Boolean'];
  id: Scalars['String'];
  image_uris?: Maybe<ImageUris>;
  imgKey: Scalars['String'];
  isTwoFaced: Scalars['Boolean'];
  legalities: Legalities;
  mana_cost?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  nonfoil: Scalars['Boolean'];
  oracleCard: OracleCard;
  oracle_id: Scalars['String'];
  oracle_text?: Maybe<Scalars['String']>;
  possiblePartner?: Maybe<Scalars['String']>;
  priceEur: Scalars['Float'];
  priceUsd: Scalars['Float'];
  prices: Prices;
  primary_variant?: Maybe<Scalars['String']>;
  produced_mana?: Maybe<Array<Scalars['String']>>;
  purchase_uris: PurchaseUris;
  rarity: Scalars['String'];
  relatedCards?: Maybe<Array<Card>>;
  rulings_uri: Scalars['String'];
  scryfall_uri?: Maybe<Scalars['String']>;
  set: Scalars['String'];
  set_name: Scalars['String'];
  type_line: Scalars['String'];
};

export type CardFace = {
  __typename?: 'CardFace';
  colors?: Maybe<Array<Maybe<Scalars['String']>>>;
  image_uris?: Maybe<ImageUris>;
  name: Scalars['String'];
};

export type CardInputType = {
  amount?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
  isFoil?: InputMaybe<Scalars['Boolean']>;
};

export type CardsOptionsInput = {
  cardTypes?: InputMaybe<Array<Scalars['String']>>;
  cmc?: InputMaybe<Scalars['String']>;
  colors?: InputMaybe<Scalars['String']>;
  isCommanderLegal?: InputMaybe<Scalars['String']>;
  isLegendary?: InputMaybe<Scalars['String']>;
  isOwned?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orderBy?: InputMaybe<Scalars['String']>;
  power?: InputMaybe<Scalars['String']>;
  rarity?: InputMaybe<Scalars['String']>;
  sets?: InputMaybe<Array<Scalars['String']>>;
  subTypes?: InputMaybe<Array<Scalars['String']>>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  text?: InputMaybe<Scalars['String']>;
  toughness?: InputMaybe<Scalars['String']>;
};

export type ChangeCollectionInput = {
  amountOwned?: InputMaybe<Scalars['Int']>;
  amountOwnedFoil?: InputMaybe<Scalars['Int']>;
  id: Scalars['String'];
};

export type Collection = {
  __typename?: 'Collection';
  currentSnapshot: CollectionSnapshot;
  id: Scalars['String'];
  referenceSnapshot?: Maybe<CollectionSnapshot>;
  visibility: Visibility;
};

export type CollectionCard = {
  __typename?: 'CollectionCard';
  card: Card;
  createdAt: Scalars['String'];
  id: Scalars['String'];
};

export type CollectionSnapshot = {
  __typename?: 'CollectionSnapshot';
  amount?: Maybe<Scalars['Int']>;
  amountUnique?: Maybe<Scalars['Int']>;
  amountUniqueVersions?: Maybe<Scalars['Int']>;
  date: Scalars['String'];
  missingPriceEur?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
  valueEur?: Maybe<Scalars['Int']>;
};

export type ContainingList = {
  __typename?: 'ContainingList';
  amount: Scalars['Int'];
  deck?: Maybe<ContainingListDeck>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ContainingListDeck = {
  __typename?: 'ContainingListDeck';
  imgSrc?: Maybe<Scalars['String']>;
};

export enum Currency {
  Eur = 'Eur',
  EurFoil = 'EurFoil',
  Usd = 'Usd',
  UsdFoil = 'UsdFoil',
}

export type Deck = {
  __typename?: 'Deck';
  canEdit: Scalars['Boolean'];
  cards: Array<DeckCard>;
  colors?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  imgSrc: Scalars['String'];
  lastEdit: Scalars['String'];
  name: Scalars['String'];
  numberOfCards: Scalars['Int'];
  status: DeckStatus;
  visibility: Visibility;
  wantsLists: Array<WantsList>;
};

export type DeckCard = {
  __typename?: 'DeckCard';
  amount: Scalars['Int'];
  card: Card;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  isCommander?: Maybe<Scalars['Boolean']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export enum DeckStatus {
  Active = 'active',
  Archived = 'archived',
  Draft = 'draft',
}

export type EdhRecCard = {
  __typename?: 'EDHRecCard';
  id: Scalars['String'];
  imgKey: Scalars['String'];
  name: Scalars['String'];
  owned: Scalars['Boolean'];
  priceEur?: Maybe<Scalars['Float']>;
  priceUsd?: Maybe<Scalars['Float']>;
  synergy?: Maybe<Scalars['Float']>;
};

export type EdhRecCategory = {
  __typename?: 'EDHRecCategory';
  cards?: Maybe<Array<EdhRecCard>>;
  key: Scalars['String'];
  title: Scalars['String'];
};

export type EdhRecData = {
  __typename?: 'EDHRecData';
  cardLists: Array<EdhRecCategory>;
  themes: Array<EdhRecTheme>;
};

export type EdhRecTheme = {
  __typename?: 'EDHRecTheme';
  count: Scalars['Int'];
  title: Scalars['String'];
  urlSuffix: Scalars['String'];
};

export type EditDeckCardInput = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  isCommander?: InputMaybe<Scalars['Boolean']>;
  isDefault?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type EditDeckFieldsInput = {
  imgSrc?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type EditWantsListCardInput = {
  amount?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
};

export type EditWantsListFieldsInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type ImageUris = {
  __typename?: 'ImageUris';
  art_crop?: Maybe<Scalars['String']>;
  normal?: Maybe<Scalars['String']>;
  small?: Maybe<Scalars['String']>;
};

export type LtPlayer = {
  __typename?: 'LTPlayer';
  color?: Maybe<Scalars['String']>;
  img?: Maybe<Scalars['String']>;
  lastEdit?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Legalities = {
  __typename?: 'Legalities';
  commander?: Maybe<Scalars['String']>;
  modern?: Maybe<Scalars['String']>;
  standard?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  session: Scalars['String'];
  user: User;
};

export type MoveCardInputType = {
  id: Scalars['String'];
  type: MoveToNameType;
};

export type MoveCardListType = Deck | WantsList;

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
  addCardsToDeck: Deck;
  addCardsToWantsList: Array<WantsListCard>;
  addTagsToCards: Array<DeckCard>;
  addToCollection: Array<CollectionCard>;
  changeCollection?: Maybe<CollectionCard>;
  changeCollectionVisibility: Collection;
  changeDeckStatus: Deck;
  changeDeckVisibility: Deck;
  changeWantsListVisibility: WantsList;
  createDeck: Deck;
  createWantsList: WantsList;
  deleteAllFromCollection?: Maybe<Scalars['Boolean']>;
  deleteDeck?: Maybe<Scalars['Boolean']>;
  deleteFromCollection?: Maybe<Scalars['Boolean']>;
  deleteFromDeck: Deck;
  deleteFromWantsList: WantsList;
  deleteLtPlayer?: Maybe<Scalars['Boolean']>;
  deleteWantsList: Scalars['Boolean'];
  duplicateDeck: Scalars['String'];
  duplicateWantsList: WantsList;
  editDeck: Deck;
  editDeckCard: DeckCard;
  editWantsList: WantsList;
  editWantsListCard: WantsListCard;
  linkWantsList: WantsList;
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  moveCard: MoveCardReturnType;
  setCommander: Deck;
  setDefaultTags?: Maybe<Scalars['Boolean']>;
  setUsername: User;
  unlinkWantsList: WantsList;
  updateCardImages?: Maybe<Scalars['Boolean']>;
  updateLtPlayer: LtPlayer;
};

export type MutationAddCardsToDeckArgs = {
  cards: Array<CardInputType>;
  deckId: Scalars['String'];
  deckName?: InputMaybe<Scalars['String']>;
};

export type MutationAddCardsToWantsListArgs = {
  cards: Array<CardInputType>;
  wantsListId: Scalars['String'];
  wantsListName?: InputMaybe<Scalars['String']>;
};

export type MutationAddTagsToCardsArgs = {
  cardIds: Array<Scalars['String']>;
  deckId: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type MutationAddToCollectionArgs = {
  cards: Array<InputMaybe<CardInputType>>;
};

export type MutationChangeCollectionArgs = {
  added?: InputMaybe<Array<ChangeCollectionInput>>;
  cardId?: InputMaybe<Scalars['String']>;
  cardOracleId: Scalars['String'];
  deleted?: InputMaybe<Array<Scalars['String']>>;
  edited?: InputMaybe<Array<ChangeCollectionInput>>;
};

export type MutationChangeCollectionVisibilityArgs = {
  visibility: Visibility;
};

export type MutationChangeDeckStatusArgs = {
  deckId: Scalars['String'];
  status: DeckStatus;
};

export type MutationChangeDeckVisibilityArgs = {
  deckId: Scalars['String'];
  visibility: Visibility;
};

export type MutationChangeWantsListVisibilityArgs = {
  visibility: Visibility;
  wantsListId: Scalars['String'];
};

export type MutationCreateWantsListArgs = {
  deckId?: InputMaybe<Scalars['String']>;
};

export type MutationDeleteAllFromCollectionArgs = {
  oracleIds: Array<Scalars['String']>;
};

export type MutationDeleteDeckArgs = {
  deckId: Scalars['String'];
};

export type MutationDeleteFromCollectionArgs = {
  cardIds: Array<InputMaybe<Scalars['String']>>;
};

export type MutationDeleteFromDeckArgs = {
  cardId?: InputMaybe<Scalars['String']>;
  cardIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  deckId: Scalars['String'];
};

export type MutationDeleteFromWantsListArgs = {
  oracleIds: Array<Scalars['String']>;
  wantsListId: Scalars['String'];
};

export type MutationDeleteLtPlayerArgs = {
  name: Scalars['String'];
};

export type MutationDeleteWantsListArgs = {
  wantsListId: Scalars['String'];
};

export type MutationDuplicateDeckArgs = {
  deckId: Scalars['String'];
};

export type MutationDuplicateWantsListArgs = {
  wantsListId: Scalars['String'];
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

export type MutationEditWantsListArgs = {
  newProperties: EditWantsListFieldsInput;
  wantsListId: Scalars['String'];
};

export type MutationEditWantsListCardArgs = {
  cardId: Scalars['String'];
  newProps: EditWantsListCardInput;
  wantsListId: Scalars['String'];
};

export type MutationLinkWantsListArgs = {
  deckId: Scalars['String'];
  wantsListId: Scalars['String'];
};

export type MutationLoginArgs = {
  token: Scalars['String'];
};

export type MutationLogoutArgs = {
  sessionId: Scalars['String'];
};

export type MutationMoveCardArgs = {
  cardId: Scalars['String'];
  from: MoveCardInputType;
  to: MoveCardInputType;
};

export type MutationSetCommanderArgs = {
  cardIds: Array<Scalars['String']>;
  deckId: Scalars['String'];
};

export type MutationSetDefaultTagsArgs = {
  oracleId: Scalars['String'];
  tags: Array<Scalars['String']>;
};

export type MutationSetUsernameArgs = {
  username: Scalars['String'];
};

export type MutationUnlinkWantsListArgs = {
  wantsListId: Scalars['String'];
};

export type MutationUpdateCardImagesArgs = {
  cardId: Scalars['String'];
};

export type MutationUpdateLtPlayerArgs = {
  color?: InputMaybe<Scalars['String']>;
  img?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type OracleCard = {
  __typename?: 'OracleCard';
  _id: Scalars['String'];
  allSets: Array<Card>;
  containingDecks: Array<Deck>;
  containingWantsLists: Array<ContainingList>;
  isCommanderLegal: Scalars['Boolean'];
  minPriceEur: Scalars['Float'];
  minPriceUsd: Scalars['Float'];
  owned: Scalars['Boolean'];
  primaryTypes: Array<Scalars['String']>;
  subTypes: Array<Scalars['String']>;
  sumPriceEur?: Maybe<Scalars['Float']>;
  sumPriceUsd?: Maybe<Scalars['Float']>;
  totalAmount: Scalars['Int'];
};

export type PaginatedCards = {
  __typename?: 'PaginatedCards';
  cards: Array<Card>;
  hasMore: Scalars['Boolean'];
  nextOffset?: Maybe<Scalars['Int']>;
  totalResults: Scalars['Int'];
};

export type PaginatedCollection = {
  __typename?: 'PaginatedCollection';
  cards: Array<CollectionCard>;
  hasMore: Scalars['Boolean'];
  nextOffset?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  totalResults: Scalars['Int'];
};

export type PriceDevelopment = {
  __typename?: 'PriceDevelopment';
  date: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
};

export type Prices = {
  __typename?: 'Prices';
  eur?: Maybe<Scalars['String']>;
  eur_foil?: Maybe<Scalars['String']>;
  usd?: Maybe<Scalars['String']>;
  usd_foil?: Maybe<Scalars['String']>;
};

export type ProxyCard = {
  __typename?: 'ProxyCard';
  amount?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  imgKey: Scalars['String'];
  isTwoFaced: Scalars['Boolean'];
  name: Scalars['String'];
};

export type PurchaseUris = {
  __typename?: 'PurchaseUris';
  cardmarket?: Maybe<Scalars['String']>;
  tcgplayer?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allLists: AllLists;
  cachedCards: Array<CachedCard>;
  card: Card;
  cardByOracleId?: Maybe<Card>;
  cardImages: Array<Maybe<Scalars['String']>>;
  cardSearch: PaginatedCards;
  cards: Array<Maybe<Card>>;
  cardsBySet: Array<Card>;
  collection: Collection;
  collectionBySet: Array<Set>;
  collectionSnapshots: Array<CollectionSnapshot>;
  deck?: Maybe<Deck>;
  decks: Array<Deck>;
  edhrecCards?: Maybe<EdhRecData>;
  ltPlayers?: Maybe<Array<LtPlayer>>;
  numberOfCachedCards: Scalars['Int'];
  ownedCardNames: Array<Scalars['String']>;
  paginatedCollection: PaginatedCollection;
  priceDevelopment: Array<PriceDevelopment>;
  proxies: Array<ProxyCard>;
  publicCollection?: Maybe<Array<CollectionCard>>;
  tokenFinder: Array<Card>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  wantedCards?: Maybe<WantedCards>;
  wantsList: WantsList;
  wantsLists: Array<WantsList>;
};

export type QueryCardArgs = {
  id: Scalars['String'];
};

export type QueryCardByOracleIdArgs = {
  oracle_id: Scalars['String'];
};

export type QueryCardImagesArgs = {
  cardId: Scalars['String'];
};

export type QueryCardSearchArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  options: CardsOptionsInput;
};

export type QueryCardsArgs = {
  cardIds: Array<InputMaybe<Scalars['String']>>;
};

export type QueryCardsBySetArgs = {
  setKey: Scalars['String'];
};

export type QueryDeckArgs = {
  id: Scalars['String'];
};

export type QueryEdhrecCardsArgs = {
  names: Array<Scalars['String']>;
  themeSuffix?: InputMaybe<Scalars['String']>;
};

export type QueryPaginatedCollectionArgs = {
  addedWithin?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  orderBy: Scalars['String'];
  search?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type QueryPriceDevelopmentArgs = {
  cardId: Scalars['String'];
  currency: Currency;
};

export type QueryProxiesArgs = {
  filter?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type QueryPublicCollectionArgs = {
  username: Scalars['String'];
};

export type QueryWantedCardsArgs = {
  username: Scalars['String'];
};

export type QueryWantsListArgs = {
  id: Scalars['String'];
};

export type QueryWantsListsArgs = {
  deckId?: InputMaybe<Scalars['String']>;
};

export type Set = {
  __typename?: 'Set';
  card_count: Scalars['Int'];
  code: Scalars['String'];
  icon_svg_uri: Scalars['String'];
  name: Scalars['String'];
  released_at: Scalars['String'];
  set_type: Scalars['String'];
  totalCardsOwned: Scalars['Int'];
  uniqueCardCount: Scalars['Int'];
  uniqueCardsOwned: Scalars['Int'];
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['String'];
  imgKey: Scalars['String'];
  isTwoFaced: Scalars['Boolean'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  email: Scalars['String'];
  featureFlags?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['String'];
  name: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export enum Visibility {
  Hidden = 'hidden',
  Private = 'private',
  Public = 'public',
}

export type WantedCard = {
  __typename?: 'WantedCard';
  id: Scalars['String'];
  imgKey: Scalars['String'];
  name: Scalars['String'];
  oracle_id: Scalars['String'];
};

export type WantedCards = {
  __typename?: 'WantedCards';
  decks: Array<Maybe<WantedCardsList>>;
  wantsLists: Array<Maybe<WantedCardsList>>;
};

export type WantedCardsList = {
  __typename?: 'WantedCardsList';
  cards: Array<WantedCard>;
  id: Scalars['String'];
  imgSrc?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type WantsList = {
  __typename?: 'WantsList';
  canEdit: Scalars['Boolean'];
  cardPreviews?: Maybe<Array<Scalars['String']>>;
  cards: Array<WantsListCard>;
  createdAt: Scalars['String'];
  deck?: Maybe<Deck>;
  id: Scalars['String'];
  lastEdit: Scalars['String'];
  name: Scalars['String'];
  numberOfCards: Scalars['Int'];
  visibility: Visibility;
};

export type WantsListCard = {
  __typename?: 'WantsListCard';
  amount: Scalars['Int'];
  card: Card;
  createdAt: Scalars['String'];
  id: Scalars['String'];
};
