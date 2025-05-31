// eslint-disable-next-line import/no-cycle
import { FloatingMana, Phase, PlayerZone } from 'backend/database/gamestate.types';
import { PermanentCardType } from 'utils/cardTypes';

export const SOCKET_MSG_GENERAL = {
  ERROR: 'error',
  NOT_LOGGED_IN: 'not_logged_in',
};

export const SOCKET_MSG_LOBBY = {
  INITIALIZE: 'initialize_lobby',
  HOST_LOBBY: 'host_lobby',
  UPDATE_LOBBIES: 'update_lobbies',
  JOIN_LOBBY: 'join_lobby',
  LEAVE_LOBBY: 'leave_lobby',
  SELECT_DECK: 'select_deck',
  SELECT_COLOR: 'select_color',
  READY: 'ready',
  START_MATCH: 'start_match',
};

export const SOCKET_MSG_GAME = {
  INITIALIZE: 'initialize_game',
  INITIALIZE_PLAYTEST: 'initialize_playtest',
  RESTART_GAME: 'restart_game',
  RESIGN_GAME: 'resign_game',
  INITIATE_REMATCH: 'initiate_rematch',
  UPDATE_REMATCH_OPTIONS: 'update_rematch_options',
  UPDATE_REMATCH_PLANECHASE_OPTIONS: 'update_rematch_planechase_options',
  GAME_STATE: 'game_state',
  ACCEPT_HAND: 'ACCEPT_HAND',
  TAKE_MULLIGAN: 'take_mulligan',
  UPDATE_PLAYER: 'update_player',
  GAME_LOG: 'game_log',
  SEND_CHAT_MESSAGE: 'send_chat_message',
  EXECUTE_COMMAND: 'execute_command',
  END_TURN: 'end_turn',
  SET_PHASE: 'set_phase',
  SET_STOP_POINT: 'set_stop_point',

  DRAW_CARD: 'draw_card',
  MOVE_CARD: 'move_card',
  MOVE_CARDS_GROUP: 'move_cards_group',
  DISCARD_RANDOM_CARD: 'discard_random_card',
  RETURN_RANDOM_CARD_FROM_GRAVEYARD: 'return_random_card_from_graveyard',
  ADD_COUNTER: 'add_counter',
  TAP_CARDS: 'tap_cards',
  TRANSFORM_CARDS: 'transform_cards',
  FLIP_CARDS: 'FLIP_CARDS',
  TURN_FACE_DOWN: 'turn_face_down',
  PEEK_FACE_DOWN: 'peek_face_down',
  PLAY_TOP_CARD_FACE_DOWN: 'play_top_card_face_down',
  MILL: 'mill',
  PEEK: 'peek_library',
  END_PEEK: 'end_peek',
  REVEAL_CARDS: 'reveal_cards',
  SEARCH_LIBRARY: 'search_library',
  SHUFFLE_LIBRARY: 'shuffle_library',
  TRACK_FLOATING_MANA: 'track_floating_mana',
  TOGGLE_STACK_OPEN: 'toggle_stack_open',
  CREATE_TOKEN: 'create_token',
  COPY_CARD: 'copy_card',

  SET_COMMANDER_TIMES_CASTED: 'set_commander_times_casted',
  SET_PLAYER_LIFE: 'set_player_life',
  SET_COMMANDER_DAMAGE: 'set_commander_damage',

  HOVER_CARD: 'hover_card',
  ROLL_PLANAR_DICE: 'roll_planar_dice',
  PLANESWALK: 'planeswalk',
  SET_PLAY_WITH_TOP_CARD_REVEALED: 'set_play_with_top_card_revealed',
  AVAILABLE_UNDO_IDS: 'available_undo_ids',
  UNDO: 'undo',
};

export interface AcceptHandPayload {
  cardIdsToLibrary: string[];
}

export interface MoveCardDetails {
  position?: { x: number; y: number };
  index?: number;
}

type MoveCardTo =
  | {
      zone: PlayerZone;
      playerId: string;
    }
  | {
      zone: 'stack';
    };
export interface MoveCardPayload extends MoveCardDetails {
  clashId: string;
  faceDown?: boolean;
  to: MoveCardTo;
}

export interface MoveCardsGroupPayload {
  cardIds: string[];
  battlefieldPlayerId: string;
  delta: { x: number; y: number };
}

export interface DiscardRandomCardPayload {
  playerId: string;
}

export interface AddCountersPayload {
  cardIds: string[];
  type: string;
  amount: number;
}

export interface CreateTokenPayload {
  cardId: string;
  name: string;
  battlefieldPlayerId: string;
  position?: { x: number; y: number };
}

export interface CopyCardPayload {
  clashId: string;
  battlefieldPlayerId: string;
  amount: number;
}

export interface TapCardsPayload {
  cardIds?: string[];
  type?: PermanentCardType | 'All';
  battlefieldPlayerId: string;
  tapped?: boolean;
}

export interface TransformCardsPayload {
  cardIds: string[];
  battlefieldPlayerId: string;
  transformed?: boolean;
}

export interface FlipCardsPayload {
  cardIds: string[];
  battlefieldPlayerId: string;
}

export interface TurnCardsFaceDownPayload {
  cardIds: string[];
  faceDown?: boolean;
  battlefieldPlayerId: string;
}
export interface PlayTopCardFaceDownPayload {
  playerId: string;
}

export interface PeekFaceDownPayload {
  cardId: string;
  battlefieldPlayerId: string;
}

export interface HoverCardPayload {
  clashId: string;
}

export interface MillPayload {
  playerId: string;
  amount: number;
}

export interface PeekPayload {
  playerId: string;
  amount: number;
  zone: PlayerZone;
}

export interface RevealPayload {
  zone: PlayerZone;
  amount?: number;
}

export interface EndPeekPayload {
  playerId: string;
  cardsToTop: string[];
  cardsToBottom: string[];
  shuffleLibrary: boolean;
  randomizeBottomCards: boolean;
}

export interface SearchLibraryPayload {
  playerId: string;
}

export interface SendMessagePayload {
  message: string;
}

export type TrackFloatingManaPayload = Partial<FloatingMana>;

export interface ToggleStackOpenPayload {
  visible: boolean;
}

interface RollDiceCommand {
  command: 'roll';
  args: { sides: number; numberOfDice: number };
}

interface FlipCoinCommand {
  command: 'flip';
  args: { numberOfCoins: number };
}

export type ChatCommandPayload = RollDiceCommand | FlipCoinCommand;

export interface SetCommanderTimesCastedPayload {
  commanderClashId: string;
  total: number;
}

export interface SetPlayerLifePayload {
  forPlayerId: string;
  total: number;
}

export interface SetCommanderDamagePayload {
  forPlayerId: string;
  commanderId: string;
  total: number;
  changeLife: boolean;
}

export interface SetPhasePayload {
  phase: Phase;
}

export interface SetStopPointPayload {
  phase: Phase;
}

export interface SetPlayWithTopCardRevealedPayload {
  revealed: boolean;
}
