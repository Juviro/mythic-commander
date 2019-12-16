import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { getCollection } from '../../queries'

import CardView from '../Elements/CardView/CardView'
import Header from './Header'

export default () => {
  const { data, loading } = useQuery(getCollection)
  const cards = (data && data.collection) || []

  return (
    <>
      <Header />
      <CardView cards={cards} loading={loading} />
    </>
  )
}
