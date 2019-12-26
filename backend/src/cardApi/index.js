import { getCardsByName, populateCards } from './internal'
import { getCardsByName as getCardsByNameScryfall } from './scryfallApi'

module.exports = {
  populateCards,
  getCardsByName,
  getCardsByNameScryfall,
}
