import { Cards, CardIdentifier, Catalog } from 'scryfall-sdk'

const MAX_CARDS = 60

const test = async () => {
  let start = Date.now()
  const cards = await Catalog.cardNames()
  console.log('fetched  cards in ' + (Date.now() - start) / 1000 + 's')
  start = Date.now()

  const filteredCards = cards.filter(card => card.indexOf('Hans') > -1)
  console.log('filtered cards in ' + (Date.now() - start) / 1000 + 's ', filteredCards)
}
test()

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
  const collection = ids.map(id => CardIdentifier.byId(id))
  const cards = await Cards.collection(...collection).waitForAll()

  console.log('cards', cards)
  return cards
}
