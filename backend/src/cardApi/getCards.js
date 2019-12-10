import { Cards, CardIdentifier } from 'scryfall-sdk'

const getCollection = async (collection, identifier) => {
  if (!collection.length) return []

  const cardCollection = collection.map(id => identifier(id))
  const cards = await Cards.collection(...cardCollection).waitForAll()

  return cards
}

export const getCardsById = async ids => {
  return getCollection(ids, CardIdentifier.byId)
}

export const getCardsByName = async names => {
  return getCollection(names, CardIdentifier.byName)
}
