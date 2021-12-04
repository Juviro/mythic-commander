import db from '../database';
import { AuthenticationError } from 'apollo-server-koa';

const throwAuthError = (message = 'Not authenticated') => {
  throw new AuthenticationError(message);
};

const canAccess = async (type, userId, id) => {
  if (userId) {
    const isOwner = await db(type)
      .where({ userId, id })
      .first();

    if (isOwner) return;
  }

  const isPublic = await db(type)
    .where({ id })
    .andWhereNot('visibility', 'private')
    .first();

  if (!isPublic) throwAuthError();
};

const canEdit = async (type, userId, id) => {
  const isOwner = await db(type)
    .where({ userId, id })
    .first();
  if (!isOwner) throwAuthError();
};

export const canAccessDeck = async (userId, deckId) =>
  canAccess('decks', userId, deckId);

export const canEditDeck = async (userId, deckId) =>
  canEdit('decks', userId, deckId);

export const canAccessWantsList = async (userId, wantsListId) =>
  canAccess('wantsLists', userId, wantsListId);

export const canEditWantsList = async (userId, wantsListId) =>
  canEdit('wantsLists', userId, wantsListId);

export const isCollectionPublic = async userId => {
  const collectionVisibility = await db('collectionVisibility')
    .where({ userId })
    .first();

  if (!collectionVisibility || collectionVisibility.visibility !== 'hidden') {
    throwAuthError('This collection is private.');
  }
};

export const hasFeatureFlag = async (userId, featureFlag) => {
  const user = await db('users')
    .whereRaw('? = ANY("featureFlags")', featureFlag)
    .andWhere({ id: userId })
    .first();

  if (!user) {
    throwAuthError(`User ${userId} has no feature flag ${featureFlag}`);
  }
};
