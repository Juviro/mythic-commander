import { GameLog, LOG_MESSAGES } from 'backend/constants/logMessages';

const { DRAW_CARD, SET_COMMANDER_TIMES_CASTED, SET_LIFE, ADD_COUNTERS } = LOG_MESSAGES;

const GROUPABLE_LOG_KEYS = [
  DRAW_CARD,
  SET_COMMANDER_TIMES_CASTED,
  SET_LIFE,
  ADD_COUNTERS,
] as string[];

const addLogEntry = (currentLog: GameLog[], newLog: GameLog) => {
  const lastLog = currentLog.at(-1);
  const isSameLogType = lastLog?.logKey === newLog.logKey;
  const isSamePlayer = lastLog?.playerId === newLog.playerId;
  const canGroup = GROUPABLE_LOG_KEYS.includes(newLog.logKey);

  if (!lastLog || !isSameLogType || !isSamePlayer || !canGroup) {
    return [...currentLog, newLog];
  }

  const newLastLog = { ...lastLog, payload: { ...lastLog.payload } } as GameLog;

  if (
    newLastLog.logKey === SET_LIFE &&
    newLog.logKey === SET_LIFE &&
    newLastLog.payload.forPlayerId !== newLog.payload.forPlayerId
  ) {
    return [...currentLog, newLog];
  }
  if (
    newLastLog.logKey === SET_COMMANDER_TIMES_CASTED &&
    newLog.logKey === SET_COMMANDER_TIMES_CASTED &&
    newLastLog.payload.commanderClashId !== newLog.payload.commanderClashId
  ) {
    return [...currentLog, newLog];
  }
  if (
    newLastLog.logKey === ADD_COUNTERS &&
    newLog.logKey === ADD_COUNTERS &&
    (newLastLog.payload.cardIds.join(',') !== newLog.payload.cardIds.join(',') ||
      newLastLog.payload.type !== newLog.payload.type)
  ) {
    return [...currentLog, newLog];
  }

  if ('amount' in newLog.payload && 'amount' in newLastLog.payload) {
    newLastLog.payload.amount += newLog.payload.amount;
  }
  if ('total' in newLog.payload && 'total' in newLastLog.payload) {
    newLastLog.payload.total = newLog.payload.total;
  }

  return [...currentLog.slice(0, -1), newLastLog];
};

export default addLogEntry;
