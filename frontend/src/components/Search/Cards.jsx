import React from 'react'
import styled from 'styled-components'

import Card from './Card'
import CardSpinner from './CardSpinner'

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  position: relative;
  height: 200px;
`

export default ({ cards, loading }) => {
  return <CardsWrapper>{loading ? <CardSpinner /> : cards.map(card => <Card {...card} key={card.id} />)}</CardsWrapper>
}
