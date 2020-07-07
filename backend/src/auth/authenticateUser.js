import db from '../database';
import { ValidationError } from 'apollo-server-koa';

export const canAccessDeck = async (userId, deckId) => {
  const isAuthenticated = await db('decks')
    .where({ userId, id: deckId })
    .first();
  if (!isAuthenticated) throw new ValidationError('Not authenticated');
};

export const canAccessWantsList = async (userId, wantsListId) => {
  const isAuthenticated = await db('wantsLists')
    .where({ userId, id: wantsListId })
    .first();
  if (!isAuthenticated) throw new ValidationError('Not authenticated');
};

export const isCollectionPublic = async userId => {
  const collectionVisibility = await db('collectionVisibility')
    .where({ userId })
    .first();
  if (!collectionVisibility || collectionVisibility.visibility !== 'public') {
    throw new ValidationError('This collection is private.');
  }
};
