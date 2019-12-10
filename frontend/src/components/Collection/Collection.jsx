import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { getCollection } from './query'

import CardSpinner from '../Elements/CardView/CardSpinner'
import Overview from './Overview'

export default () => {
  const { data, loading } = useQuery(getCollection)

  return loading ? <CardSpinner /> : <Overview cards={data.collection} />
}
