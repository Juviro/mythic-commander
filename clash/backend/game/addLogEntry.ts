import { GameLog, LOG_MESSAGES } from 'backend/constants/logMessages';

const {
  DRAW_CARD,
  SET_COMMANDER_TIMES_CASTED,
  SET_LIFE,
  ADD_COUNTERS,
  SET_COMMANDER_DAMAGE,
  MOVE_CARDS,
  UNDO,
} = LOG_MESSAGES;

const GROUPABLE_LOG_KEYS = [
  DRAW_CARD,
  SET_COMMANDER_TIMES_CASTED,
  SET_LIFE,
  ADD_COUNTERS,
  SET_COMMANDER_DAMAGE,
  MOVE_CARDS,
  UNDO,
] as string[];

const simpleCompareObject = (obj1: Record<string, any>, obj2: Record<string, any>) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

const addLogEntry = (currentLog: GameLog[], newLog: GameLog) => {
  const lastLog = currentLog.at(-1);
  const isSameLogType = lastLog?.logKey === newLog.logKey;
  const isSamePlayer = lastLog?.playerId === newLog.playerId;
  const canGroup = GROUPABLE_LOG_KEYS.includes(newLog.logKey);

  if (!lastLog || !isSameLogType || !isSamePlayer || !canGroup) {
    return [...currentLog, newLog];
  }

  const newLastLog = {
    ...lastLog,
    timestamp: Date.now(),
    payload: { ...lastLog.payload },
  } as GameLog;

  if (
    newLastLog.logKey === SET_LIFE &&
    newLog.logKey === SET_LIFE &&
    newLastLog.payload.forPlayerId !== newLog.payload.forPlayerId
  ) {
    return [...currentLog, newLog];
  }
  if (
    newLastLog.logKey === SET_COMMANDER_DAMAGE &&
    newLog.logKey === SET_COMMANDER_DAMAGE &&
    (newLastLog.payload.forPlayerId !== newLog.payload.forPlayerId ||
      newLastLog.payload.commanderId !== newLog.payload.commanderId)
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
    newLastLog.logKey === MOVE_CARDS &&
    newLog.logKey === MOVE_CARDS &&
    (!simpleCompareObject(newLastLog.payload.from, newLog.payload.from) ||
      !simpleCompareObject(newLastLog.payload.to, newLog.payload.to))
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
  if ('numberOfUndos' in newLog.payload && 'numberOfUndos' in newLastLog.payload) {
    console.log('newLastLog.payload', newLastLog.payload.numberOfUndos);
    console.log('newLog.payload', newLog.payload.numberOfUndos);
    newLastLog.payload.numberOfUndos += newLog.payload.numberOfUndos;
  }
  if (newLastLog.logKey === MOVE_CARDS && newLog.logKey === MOVE_CARDS) {
    newLastLog.payload.cardNames.push(...newLog.payload.cardNames);
  }

  return [...currentLog.slice(0, -1), newLastLog];
};

export default addLogEntry;
