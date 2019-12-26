import { ValidationError } from 'apollo-server-koa'

import { populateCards } from '../../../cardApi/'

export default {
  Query: {
    decks: async (_, _1, { user, db }) => {
      const decks = await db('decks').where({ userId: user.id })
      return decks
    },
    deck: async (_, { id }, { user, db }) => {
      const [deck] = await db('decks').where({ userId: user.id, id })
      const cards = await db('cardToDeck').where({ deckId: deck.id })
      return { ...deck, cards: populateCards(cards) }
    },
  },
  Mutation: {
    createDeck: async (_, _1, { user, db }) => {
      const [deckId] = await db('decks')
        .insert({ userId: user.id })
        .returning('id')
      const [deck] = await db('decks').where({ id: deckId })
      return deck
    },
    editDeck: async (_, { imgSrc, name, deckId }, { user, db }) => {
      await db('decks')
        .where({ userId: user.id, id: deckId })
        .update({
          imgSrc: imgSrc || undefined,
          name: name || undefined,
          lastEdit: new Date(),
        })
      const [updatedDeck] = await db('decks').where({ id: deckId })

      return updatedDeck
    },
    addCardsToDeck: async (_, { cards, deckId }, { user, db }) => {
      const isAuthenticated = (await db('decks').where({ userId: user.id, id: deckId })).length
      if (!isAuthenticated) throw new ValidationError('Deck not found')

      const cardsToInsert = cards.map(({ cardId, zone }) => ({ deckId, cardId, zone }))
      const query = db('cardToDeck')
        .insert(cardsToInsert)
        .toString()

      await db.raw(query.replace(/^insert/i, 'insert ignore'))
      return cardsToInsert
    },
  },
}
