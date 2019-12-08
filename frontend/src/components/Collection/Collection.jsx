import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { getCollection } from './query'
import { getCardsById } from '../../network/mtgApi'

import CardSpinner from '../Elements/CardSpinner'
import Overview from './Overview'

export default () => {
  const { data } = useQuery(getCollection)
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!data) return

    const loadCards = async () => {
      const ids = data.collection.map(({ id }) => id)
      const allCards = await getCardsById(ids)
      setCards(allCards)
      setIsLoading(false)
    }
    loadCards()
  }, [data])

  return isLoading ? <CardSpinner /> : <Overview cards={cards} />
}
