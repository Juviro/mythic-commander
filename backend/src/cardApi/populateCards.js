import { getCardsById } from './getCards'

const sortByName = (a, b) => (a.name > b.name ? 1 : -1)

export default async (cards, sort) => {
  const ids = cards.map(({ id }) => id)

  const rawCards = await getCardsById(ids)
  const populatedCards = rawCards.map((card, index) => ({
    ...card,
    ...cards[index],
  }))

  return populatedCards.sort(sort || sortByName)
}
