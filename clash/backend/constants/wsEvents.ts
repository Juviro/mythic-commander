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
  GAME_STATE: 'gameState',
  UPDATE_PLAYER: 'update_player',
  GAME_LOG: 'game_log',

  DRAW_CARD: 'draw_card',
};
