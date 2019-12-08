import { Cards } from 'scryfall-sdk'

const MAX_CARDS = 50

export const getAutoComplete = search => {
  return Cards.autoCompleteName(search)
}

export const getCards = async search => {
  return new Promise(resolve => {
    const cards = []
    let isResolved = false

    const emitter = search ? Cards.search(search) : Cards.all()
    emitter
      .on('data', card => {
        if (isResolved) return
        if (cards.length >= MAX_CARDS) {
          isResolved = true
          resolve(cards)
          emitter.cancel()
        } else {
          cards.push(card)
        }
      })
      .on('end', () => {
        !isResolved && resolve(cards)
      })
  })
}
