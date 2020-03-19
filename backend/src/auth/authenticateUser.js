import db from '../database';
import { ValidationError } from 'apollo-server-koa';

export const canAccessDeck = async (userId, deckId) => {
  const isAuthenticated = (await db('decks').where({ userId, id: deckId }))
    .length;
  if (!isAuthenticated) throw new ValidationError('Not authenticated');
};

export const canAccessWantsList = async (userId, wantsListId) => {
  const isAuthenticated = (
    await db('wantsLists').where({ userId, id: wantsListId })
  ).length;
  if (!isAuthenticated) throw new ValidationError('Not authenticated');
};
