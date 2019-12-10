import React, { useState } from 'react'
import { getAllCardNames } from '../../network/mtgApi'

const CardContext = React.createContext({})

const getSettings = () => {
  const get = key => localStorage.getItem(key)
  return {
    display: {
      collection: {
        listView: get('display.collection.listView') || 'LIST',
      },
    },
  }
}

const setSetting = (key, value) => {
  localStorage.setItem(key, value)
}

const getCardsFromCache = async () => {
  const lastUpdate = localStorage.getItem('lastUpdate')
  const shouldUpdate = !lastUpdate || Date.now() - lastUpdate > 24 * 60 * 60 * 1000
  const cachedCards = localStorage.getItem('allCards')

  if (!shouldUpdate && cachedCards) {
    return JSON.parse(cachedCards)
  }

  alert('Cards updated')

  const allCardNames = await getAllCardNames()
  localStorage.setItem('allCards', JSON.stringify(allCardNames))
  localStorage.setItem('lastUpdate', Date.now())

  return allCardNames
}

export const CardContextProvider = ({ children }) => {
  const [cardNames, setCardNames] = useState([])
  const value = {
    cardNames,
    settings: getSettings(),
    setSetting,
  }
  console.log('value', value)

  const getCardNames = async () => {
    const allCardNames = await getCardsFromCache()
    setCardNames(allCardNames)
  }
  if (!cardNames.length) getCardNames()

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export default CardContext
