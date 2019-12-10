const MAX_FILES = 30

export const filterNames = (cardNames, searchString) => {
  const trimName = str => str.replace(/[\W]/g, '').toLowerCase()

  const cleanSearch = trimName(searchString)
  const foundCards = []

  cardNames.find(name => {
    const cleanCardName = trimName(name)
    if (cleanCardName.indexOf(cleanSearch) > -1) {
      foundCards.push(name)
    }

    return foundCards.length > MAX_FILES
  })

  const sortCards = (cardA, cardB) => {
    const cleanCardNameA = trimName(cardA)
    const cleanCardNameB = trimName(cardB)
    return cleanCardNameA === cleanSearch
      ? -1
      : cleanCardNameB === cleanSearch
      ? 1
      : cleanCardNameA.startsWith(cleanSearch)
      ? -1
      : cleanCardNameB.startsWith(cleanSearch)
      ? 1
      : cleanCardNameA > cleanCardNameB
      ? -1
      : 1
  }
  return foundCards.sort(sortCards)
}
