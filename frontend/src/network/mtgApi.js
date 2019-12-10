import { Cards, CardIdentifier, Catalog } from 'scryfall-sdk'

const MAX_CARDS = 60

export const getAutoComplete = search => {
  return Cards.autoCompleteName(search)
}

export const getCards = async search => {
  return new Promise(resolve => {
    const cards = []

    const emitter = search ? Cards.search(search) : Cards.all()
    emitter
      .on('data', card => {
        cards.push(card)
        if (cards.length >= MAX_CARDS) {
          resolve(cards)
          emitter.cancel()
        }
      })
      .on('end', () => {
        resolve(cards)
      })
  })
}

export const getCardsById = async ids => {
  return getCollection(ids, CardIdentifier.byId)
}

export const getCardsByName = async names => {
  return getCollection(names, CardIdentifier.byName)
}

const getCollection = async (collection, identifier) => {
  if (!collection.length) return []

  const cardCollection = collection.map(id => identifier(id))
  const cards = await Cards.collection(...cardCollection).waitForAll()

  return cards
}

export const getAllCardNames = () => {
  return Catalog.cardNames()
}
