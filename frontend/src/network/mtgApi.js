import { Cards } from 'scryfall-sdk'

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
