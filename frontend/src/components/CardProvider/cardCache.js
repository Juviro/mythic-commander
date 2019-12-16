import { getAllCardNames } from '../../network/mtgApi'

// Special cases for the two cards named
// "Our Market Research Shows That Players Like Really Long Card Names So We Made this Card to Have the Absolute Longest Card Name Ever Elemental"
// and
// "The Ultimate Nightmare of Wizards of the Coast® Customer Service"
// and
// "Curse of the Fire Penguin // Curse of the Fire Penguin Creature"
// that kind of break the search
// and the card "_____"
// that can't be found by the scryfall api
const filterProblematicCards = cardName => {
  const tooLong = cardName.length > 60
  const crashesDb = cardName.startsWith('___')

  return !tooLong && !crashesDb
}

export const getCardsFromCache = async () => {
  const lastUpdate = localStorage.getItem('lastUpdate')
  const shouldUpdate = true || !lastUpdate || Date.now() - lastUpdate > 24 * 60 * 60 * 1000
  const cachedCards = localStorage.getItem('allCards')

  if (!shouldUpdate && cachedCards) {
    return JSON.parse(cachedCards)
  }

  const allCardNames = await getAllCardNames()
  const filteredCardNames = allCardNames.filter(filterProblematicCards)

  localStorage.setItem('allCards', JSON.stringify(filteredCardNames))
  localStorage.setItem('lastUpdate', Date.now())

  return filteredCardNames
}
