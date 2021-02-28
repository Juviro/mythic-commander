import db from '../database';
import { ValidationError } from 'apollo-server-koa';

const throwAuthError = () => {
  throw new ValidationError('Not authenticated');
};

export const canAccessDeck = async (userId, deckId) => {
  const isAuthenticated = await db('decks')
    .where({ userId, id: deckId })
    .first();
  if (!isAuthenticated) throwAuthError();
};

export const canEditWantsList = async (userId, wantsListId) => {
  const isOwner = await db('wantsLists')
    .where({ userId, id: wantsListId })
    .first();
  if (!isOwner) throw new ValidationError('Not authenticated');
};

export const canAccessWantsList = async (userId, wantsListId) => {
  const isOwner = await db('wantsLists')
    .where({ userId, id: wantsListId })
    .first();

  if (isOwner) return;

  const isPublic = await db('wantsLists')
    .where({ id: wantsListId })
    .andWhereNot('visibility', 'private')
    .first();

  if (!isPublic) throwAuthError();
};

export const isCollectionPublic = async userId => {
  const collectionVisibility = await db('collectionVisibility')
    .where({ userId })
    .first();

  if (!collectionVisibility || collectionVisibility.visibility !== 'hidden') {
    throw new ValidationError('This collection is private.');
  }
};
